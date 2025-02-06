
import { Form, Button, Container } from "react-bootstrap";

export default function Profile() {
  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h3 className="mb-3">Profile</h3>
      <Form className="w-100" style={{ maxWidth: "350px" }}>
        <Form.Group className="mb-3">
          <Form.Control id="wd-username" defaultValue="alice" placeholder="Username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control id="wd-password" defaultValue="123" type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control id="wd-firstname" defaultValue="Alice" placeholder="First Name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control id="wd-lastname" defaultValue="Wonderland" placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control id="wd-dob" defaultValue="2000-01-01" type="date" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control id="wd-email" defaultValue="alice@wonderland.com" type="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select id="wd-role" defaultValue="USER">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>
        <Button variant="danger" className="w-100">
          Signout
        </Button>
      </Form>
    </Container>
  );
}
