import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function CoursesNavigation() {
  return (
    <ListGroup id="wd-courses-navigation" className = "rounded-0 wd">
      <ListGroup.Item as = {Link} to="/Kambaz/Courses/1234/Home" className = "active border-0">Home</ListGroup.Item>
      <ListGroup.Item  as = {Link} to="/Kambaz/Courses/1234/Modules" className = "border-0 text-danger bg-white">Modules</ListGroup.Item>
      <ListGroup.Item  as = {Link} to="/Kambaz/Courses/1234/Piazza" className = "border-0 text-danger bg-white">Piazza</ListGroup.Item>
      <ListGroup.Item  as = {Link} to="/Kambaz/Courses/1234/Zoom" className = "border-0 text-danger bg-white">Zoom</ListGroup.Item>
      <ListGroup.Item  as = {Link} to="/Kambaz/Courses/1234/Assignments" className = "border-0 text-danger bg-white">
            Assignments</ListGroup.Item>
      <ListGroup.Item  as = {Link} to="/Kambaz/Courses/1234/Quizzes" className = "border-0 text-danger bg-white">Quizzes</ListGroup.Item>
      <ListGroup.Item  as = {Link} to="/Kambaz/Courses/1234/Grades" className = "border-0 text-danger bg-white">Grades</ListGroup.Item>
      <ListGroup.Item  as = {Link} to="/Kambaz/Courses/1234/People" className = "border-0 text-danger bg-white">People</ListGroup.Item>
    </ListGroup>
);}
