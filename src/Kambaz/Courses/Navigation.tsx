import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = [
    "home",
    "modules",
    "piazza",
    "zoom",
    "assignments",
    "quizzes",
    "grades",
    "people",
  ];
  return (
    <ListGroup id="wd-courses-navigation" className="rounded-0 wd">
      {links.map((link) => (<ListGroup.Item
      active = {pathname.includes(link)}
        as={Link}
        to={`/Kambaz/Courses/${cid}/${link}`}
        className="border-0 text-danger bg-white"
      >
        {link}
      </ListGroup.Item>))}
     
    </ListGroup>
  );
}
