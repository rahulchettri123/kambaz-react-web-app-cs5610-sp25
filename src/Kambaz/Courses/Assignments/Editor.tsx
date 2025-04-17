import { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, InputGroup, Card } from "react-bootstrap";
import { BsCalendar } from "react-icons/bs";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { Assignment } from "./reducer";
import * as client from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [existingAssignment, setExistingAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if user is faculty or admin
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  // Only redirect if creating a new assignment (non-faculty can view existing assignments)
  useEffect(() => {
    if (!isFacultyOrAdmin && aid === "new") {
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    }
  }, [currentUser, navigate, cid, aid, isFacultyOrAdmin]);

  // Fetch assignment if editing
  useEffect(() => {
    const fetchAssignment = async () => {
      if (aid && aid !== "new") {
        try {
          setLoading(true);
          setError(null);
          const assignment = await client.findAssignmentById(aid);
          setExistingAssignment(assignment);
          setFormData(assignment);
        } catch (error) {
          console.error("Error fetching assignment:", error);
          setError("Failed to load assignment. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAssignment();
  }, [aid]);

  const [formData, setFormData] = useState<Partial<Assignment>>({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
    availableUntil: "",
    course: cid,
    submissionType: "Online",
  });

  const assignToOptions = [{ value: "everyone", label: "Everyone" }];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only faculty/admin can save changes
    if (!isFacultyOrAdmin) return;
    
    try {
      setSaveLoading(true);
      setError(null);
      
      if (existingAssignment) {
        // Update existing assignment
        try {
          const updatedAssignment = await client.updateAssignment(
            existingAssignment._id, 
            { ...formData }
          );
          dispatch(updateAssignment(updatedAssignment));
          navigate(`/Kambaz/Courses/${cid}/Assignments`);
        } catch (error: any) {
          // If the error is because no changes were made, treat it as success
          if (error?.response?.data?.message === "Assignment not found or not modified") {
            // No changes were made, but that's okay - treat as success
            navigate(`/Kambaz/Courses/${cid}/Assignments`);
          } else {
            // It's a different error, so throw it to be caught below
            throw error;
          }
        }
      } else {
        // Create new assignment
        const newAssignment = await client.createAssignment({
          ...formData,
          course: cid
        });
        dispatch(addAssignment(newAssignment));
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
      }
    } catch (error: any) {
      console.error("Error saving assignment:", error);
      setError(error?.response?.data?.message || "Failed to save assignment. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  // Don't render the form if attempting to create a new assignment as non-faculty
  if (!isFacultyOrAdmin && aid === "new") {
    return null;
  }

  if (loading) {
    return <div className="p-5 text-center">Loading assignment...</div>;
  }

  // Student view (read-only)
  if (!isFacultyOrAdmin && existingAssignment) {
    return (
      <Container className="mt-4">
        <Card>
          <Card.Header as="h4">{existingAssignment.title}</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={4}>
                <h5>Points</h5>
                <p>{existingAssignment.points}</p>
              </Col>
              <Col md={4}>
                <h5>Submission Type</h5>
                <p>{existingAssignment.submissionType}</p>
              </Col>
              <Col md={4}>
                <h5>Due Date</h5>
                <p>{new Date(existingAssignment.dueDate).toLocaleString()}</p>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <h5>Available From</h5>
                <p>{new Date(existingAssignment.availableDate).toLocaleString()}</p>
              </Col>
              <Col md={6}>
                <h5>Available Until</h5>
                <p>{new Date(existingAssignment.availableUntil).toLocaleString()}</p>
              </Col>
            </Row>
            
            <hr />
            <h5>Description</h5>
            <div className="assignment-description">
              {existingAssignment.description}
            </div>
            
            <div className="d-flex mt-4">
              <Button 
                variant="secondary" 
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}
              >
                Back to Assignments
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  // Faculty/admin edit view
  return (
    <Container className="mt-4">
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              name="points"
              value={formData.points}
              onChange={handleInputChange}
              required
            />
          </Col>
          <Col md={4}>
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label>Display Grade as</Form.Label>
            <Form.Select defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
            </Form.Select>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select
            name="submissionType"
            value={formData.submissionType}
            onChange={handleInputChange}
          >
            <option value="Online">Online</option>
            <option value="On Paper">On Paper</option>
            <option value="No Submission">No Submission</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assign to</Form.Label>
          <Select options={assignToOptions} defaultValue={assignToOptions} isMulti />
        </Form.Group>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>Due</Form.Label>
            <InputGroup>
              <Form.Control
                type="datetime-local"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                required
              />
              <InputGroup.Text>
                <BsCalendar />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Available from</Form.Label>
            <InputGroup>
              <Form.Control
                type="datetime-local"
                name="availableDate"
                value={formData.availableDate}
                onChange={handleInputChange}
                required
              />
              <InputGroup.Text>
                <BsCalendar />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={6}>
            <Form.Label>Until</Form.Label>
            <InputGroup>
              <Form.Control
                type="datetime-local"
                name="availableUntil"
                value={formData.availableUntil}
                onChange={handleInputChange}
                required
              />
              <InputGroup.Text>
                <BsCalendar />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex gap-2">
          <Button 
            variant="secondary" 
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}
            disabled={saveLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="danger" 
            type="submit"
            disabled={saveLoading}
          >
            {saveLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}