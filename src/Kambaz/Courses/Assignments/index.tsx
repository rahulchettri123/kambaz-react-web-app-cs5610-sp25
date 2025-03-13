import {
  Button,
  Form,
  InputGroup,
  Card,
  ListGroup,
  Badge,
  Modal,
} from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { BsGripVertical, BsJournalText, BsTrash } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";
import ModuleControlButtons from "../../ModuleControlButtons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const assignments = useSelector((state: any) => 
    state.assignmentsReducer.assignments.filter((a: any) => a.course === cid)
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
      setShowDeleteModal(false);
      setAssignmentToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  const isFaculty = currentUser?.role === "FACULTY";

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

        {/* Group Button - Only visible to faculty */}
        {isFaculty && (
          <Button variant="light" className="border">
            + Group
          </Button>
        )}

        {/* Assignment Button - Only visible to faculty */}
        {isFaculty && (
          <Button 
            variant="danger" 
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
          >
            + Assignment
          </Button>
        )}
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
            <span className="fs-5">+</span>
            <IoEllipsisVertical className="fs-4 text-muted" />
          </div>
        </Card.Header>

        {/* Assignments List */}
        <ListGroup variant="flush">
          {assignments.map((assignment: any) => (
            <ListGroup.Item
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
                <Link 
                  to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                  className="text-decoration-none"
                >
                  {assignment.title}
                </Link>
                <div className="small text-muted">
                  Multiple Modules | <strong>Not available until</strong>{" "}
                  {assignment.availableDate} | <strong>Due</strong>{" "}
                  {assignment.dueDate} | {assignment.points} pts
                </div>
              </div>

              {/* Right Side: Control Buttons - Only visible to faculty */}
              {isFaculty && (
                <div className="d-flex align-items-center gap-2">
                  <ModuleControlButtons />
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => handleDeleteClick(assignment._id)}
                  >
                    <BsTrash />
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Delete Confirmation Modal - Only shown to faculty */}
      {isFaculty && (
        <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Assignment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this assignment? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
