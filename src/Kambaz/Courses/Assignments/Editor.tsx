import  { useState } from "react";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import { BsCalendar } from "react-icons/bs";
import Select from "react-select";
import { db} from "../../Database";
import { useParams } from "react-router-dom";
export default function AssignmentEditor() {
  const assignToOptions = [{ value: "everyone", label: "Everyone" }];
  const [submissionType, setSubmissionType] = useState("Online");
  const [entryOptions, setEntryOptions] = useState({
    textEntry: false,
    websiteURL: true, // Pre-checked option
    mediaRecordings: false,
    studentAnnotation: false,
    fileUploads: false,
  });

  const{aid} = useParams();
  const assignment = db.assignments.find((a: any) => a._id == aid);
  function handleCheckboxChange(event: { target: { name: any; checked: any; }; }) {
    const { name, checked } = event.target;
    setEntryOptions((prev) => ({ ...prev, [name]: checked }));
  }

  return (
    <Container className="mt-4">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          
          <input id = "wd-name"value = {assignment?.title} className="form-control" />
          
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            className="form-control"
            value = {assignment?.description}
          />
        </Form.Group>

        {/* Points, Assignment Group, Grade Display */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Label>Points</Form.Label>
            <Form.Control type="number" defaultValue={100} />
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

        {/* Submission Type & Online Entry Options */}
        <Form.Group className="mb-3">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select
            value={submissionType}
            onChange={(e) => setSubmissionType(e.target.value)}
          >
            <option value="Online">Online</option>
            <option value="On Paper">On Paper</option>
            <option value="No Submission">No Submission</option>
          </Form.Select>
        </Form.Group>

        {submissionType === "Online" && (
          <Form.Group className="mb-3">
            <strong className="d-block mb-2">Online Entry Options</strong>
            <Form.Check
              type="checkbox"
              label="Text Entry"
              name="textEntry"
              checked={entryOptions.textEntry}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              label="Website URL"
              name="websiteURL"
              checked={entryOptions.websiteURL}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              name="mediaRecordings"
              checked={entryOptions.mediaRecordings}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              name="studentAnnotation"
              checked={entryOptions.studentAnnotation}
              onChange={handleCheckboxChange}
            />
            <Form.Check
              type="checkbox"
              label="File Uploads"
              name="fileUploads"
              checked={entryOptions.fileUploads}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
        )}

        {/* Assign To Section */}
        <Form.Group className="mb-3">
          <Form.Label>Assign to</Form.Label>
          <Select options={assignToOptions} defaultValue={assignToOptions} isMulti />
        </Form.Group>

        {/* Due, Available From, Until Dates */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Label>Due</Form.Label>
            <InputGroup>
              <Form.Control  value={assignment?.dueDate} />
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
              <Form.Control  value={assignment?.availableDate} />
              <InputGroup.Text>
                <BsCalendar />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={6}>
            <Form.Label>Until</Form.Label>
            <InputGroup>
              <Form.Control type="datetime-local" defaultValue="2024-05-20T00:00" />
              <InputGroup.Text>
                <BsCalendar />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </Container>
  );
}
