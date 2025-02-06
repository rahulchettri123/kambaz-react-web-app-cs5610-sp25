import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

export default function Signup() {
  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <h3 className="mb-3">Signup</h3>
      <Form className="w-100" style={{ maxWidth: "350px" }}>
        <Form.Group className="mb-3">
          <Form.Control type="text" placeholder="username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="verify password" />
        </Form.Group>
        <Button variant="primary" className="w-100">
          Sign up
        </Button>
      </Form>
      <Link to="/Kambaz/Account/Signin" className="mt-3">
        Sign in
      </Link>
    </Container>
  );
}
