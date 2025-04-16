// import { useParams } from "react-router-dom";

// import { db } from "../../Database";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import { Table } from "react-bootstrap";
// import PeopleDetails from "./Details";
import { Link } from "react-router-dom";

interface PeopleTableProps {
  users: any[];
  courseId?: string;
  isFacultyOrAdmin?: boolean;
  removeUser?: (userId: string) => void;
}

export default function PeopleTable({ 
  users = [], 
  courseId, 
  isFacultyOrAdmin = false,
  removeUser
}: PeopleTableProps) {
  // const { cid } = useParams();
  // const { users, enrollments } = db;
  
  return (
    <div id="wd-people-table">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Role</th>
            <th>Section</th>
            <th>Last Activity</th>
            {isFacultyOrAdmin && courseId && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link to={`/Kambaz/Account/Users/${user._id}`}>
                  <FaUserCircle className="me-2 fs-4 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>
                  <span className="wd-last-name"> {user.lastName}</span>
                </Link>
              </td>
              <td className="wd-login-id">{user.loginId || user.username}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-last-activity">
                {user.lastActivity ? new Date(user.lastActivity).toLocaleString() : 'Never'}
              </td>
              {isFacultyOrAdmin && courseId && (
                <td className="wd-actions text-center">
                  {removeUser && (
                    <button 
                      onClick={() => removeUser(user._id)}
                      className="btn btn-sm btn-danger">
                      <FaTrash />
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
