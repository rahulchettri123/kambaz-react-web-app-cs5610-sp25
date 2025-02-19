import {
  Button,
  Form,
  InputGroup,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { db } from "../../Database";
import { BsGripVertical, BsJournalText } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import ModuleControlButtons from "../../ModuleControlButtons";
import { Link, useParams } from "react-router-dom";

export default function Assignments() {
  const { cid } = useParams()
  const assignments = db.assignments.filter((a: any) => a.course === cid);
 
  return (
    <div className="container mt-4">
      {/* Top Controls */}
      <div className="d-flex gap-2 align-items-center mb-3">
        {/* Search Input with Icon */}
        <InputGroup className="w-auto">
          <InputGroup.Text>
            <BiSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search for Assignments"
            className="border rounded"
          />
        </InputGroup>

        {/* Group Button */}
        <Button variant="light" className="border">
          + Group
        </Button>

        {/* Assignment Button */}
        <Button variant="danger">+ Assignment</Button>
      </div>

      {/* Assignments Header */}
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          {/* Left Side: Drag Icon, Arrow, and Title */}
          <div className="d-flex align-items-center gap-2">
            <BsGripVertical className="fs-5 text-muted" />
            <TiArrowSortedDown className="fs-5 text-muted" />
            <strong>ASSIGNMENTS</strong>
          </div>

          {/* Right Side: Styled Badge and Add Icon */}
          <div className="d-flex align-items-center gap-2">
            <Badge className="rounded-pill bg-light text-dark border border-secondary px-3">
              40% of Total
            </Badge>
            <span className="fs-5">+</span> {/* Add Icon Placeholder */}
            <IoEllipsisVertical className="fs-4 text-muted" />
          </div>
        </Card.Header>

        {/* Assignments List */}
        <ListGroup variant="flush">
          {assignments.map((assignment:any) => (
            <ListGroup.Item as = {Link} to = {`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
              key={assignment._id}
              className="d-flex align-items-center justify-content-between"
            >
              {/* Left Side: Drag Icon & Book Icon */}
              <div className="d-flex align-items-center gap-2">
                <BsGripVertical className="fs-5 text-muted" />
                <BsJournalText size={20} className="text-success mx-3" />
              </div>

              {/* Middle Section: Assignment Details with Link */}
              <div className="flex-grow-1">
               
                  {assignment.title}
             
                <div className="small text-muted">
                  Multiple Modules | <strong>Not available until</strong>{" "}
                  {assignment.availableDate} | <strong>Due</strong>{" "}
                  {assignment.dueDate} | {assignment.points} pts
                </div>
              </div>

              {/* Right Side: Control Buttons */}
              <ModuleControlButtons />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
}
