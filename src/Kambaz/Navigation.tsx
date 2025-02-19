import { ListGroup } from "react-bootstrap";
import { Link, useLocation} from "react-router-dom";

import { BsPeople } from "react-icons/bs";
import { FaInbox } from "react-icons/fa";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";

export default function KambazNavigation() {
  const { pathname } = useLocation();

  const links = [
    { label: "Account", path: "/Kambaz/Account",
      icon: BsPeople },
    { label: "Dashboard", path: "/Kambaz/Dashboard",
                          icon: AiOutlineDashboard },
    { label: "Courses",   path: "/Kambaz/Courses",
                          icon: LiaBookSolid },
    { label: "Calendar",  path: "/Kambaz/Calendar",
                          icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Kambaz/Inbox",
                          icon: FaInbox },
    { label: "Labs",      path: "/Labs",
                          icon: LiaCogSolid },
  ];

  return (
    <ListGroup id="wd-kambaz-navigation" className = "rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroup.Item action  className = "border-0 bg-black text-danger text-center" href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">
        Northeastern
      </ListGroup.Item>
      {links.map((link) => (
      <ListGroup.Item key={link.path} as={Link}
        to={link.path}
        className={`bg-black text-center border-0
          ${pathname.includes(link.label) ?
            "text-danger bg-white" :
            "text-white bg-black"}`}>
          {link.icon({ className: "fs-1 text-danger"})}
        <br /> {link.label}
      </ListGroup.Item>
    ))}
      
    </ListGroup>
  );
}
