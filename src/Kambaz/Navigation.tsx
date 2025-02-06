import { ListGroup } from "react-bootstrap";
import { BsPeople } from "react-icons/bs";
import { FaBook, FaCalendarAlt, FaInbox } from "react-icons/fa";
import { GoBeaker } from "react-icons/go";
import { ImMeter } from "react-icons/im";
import { Link } from "react-router-dom";
export default function KambazNavigation() {
  return (
    <ListGroup id="wd-kambaz-navigation" className = "rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroup.Item action  className = "border-0 bg-black text-danger text-center" href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">
        Northeastern
      </ListGroup.Item>
      <ListGroup.Item as={Link} className = "border-0 text-center text-danger "  to="/Kambaz/Account" id="wd-account-link">
      <BsPeople className = "fs-1" /> <br />
        Account
      </ListGroup.Item>
      <ListGroup.Item as={Link}  className = "border-0 bg-black text-danger text-center" to="/Kambaz/Dashboard" id="wd-dashboard-link">
      <ImMeter className = "fs-1"/> <br />
        Dashboard
      </ListGroup.Item>
      <ListGroup.Item as={Link}  className = "border-0 bg-black text-danger text-center" to="/Kambaz/Courses" id="wd-course-link">
      <FaBook className = "fs-1"/>
      <br />
        Courses
      </ListGroup.Item>
      <ListGroup.Item  as={Link}  className = "border-0 bg-black text-danger text-center" to="/Kambaz/Calendar" id="wd-calendar-link">
      <FaCalendarAlt className = "fs-1" /> <br />
        Calendar
      </ListGroup.Item>
      <ListGroup.Item as={Link}  className = "border-0 bg-black text-danger text-center" to="/Kambaz/Inbox" id="wd-inbox-link">
      <FaInbox className = "fs-1"/><br />
        Inbox
      </ListGroup.Item>
      <ListGroup.Item as={Link} className = "border-0 bg-black text-danger text-center" to="/Labs" id="wd-labs-link">
      <GoBeaker className = "fs-1"/> <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
