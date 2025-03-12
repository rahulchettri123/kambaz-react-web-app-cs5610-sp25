import { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import { BsCalendar } from "react-icons/bs";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { Assignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const existingAssignment = aid ? assignments.find((a: Assignment) => a._id === aid) : null;

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

  useEffect(() => {
    if (existingAssignment) {
      setFormData(existingAssignment);
    }
  }, [existingAssignment]);

  const assignToOptions = [{ value: "everyone", label: "Everyone" }];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignmentData: Assignment = {
      ...formData as Assignment,
      _id: existingAssignment?._id || Date.now().toString(),
    };

    if (existingAssignment) {
      dispatch(updateAssignment(assignmentData));
    } else {
      dispatch(addAssignment(assignmentData));
    }

    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <Container className="mt-4">
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
          >
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
}