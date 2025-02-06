import  { useState } from "react";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import { BsCalendar } from "react-icons/bs";
import Select from "react-select";

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

  function handleCheckboxChange(event: { target: { name: any; checked: any; }; }) {
    const { name, checked } = event.target;
    setEntryOptions((prev) => ({ ...prev, [name]: checked }));
  }

  return (
    <Container className="mt-4">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue={`The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories`}
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
              <Form.Control type="datetime-local" defaultValue="2024-05-13T23:59" />
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
              <Form.Control type="datetime-local" defaultValue="2024-05-06T00:00" />
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
