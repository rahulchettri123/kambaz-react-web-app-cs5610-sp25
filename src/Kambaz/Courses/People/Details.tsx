import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle, FaEnvelope } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";

export default function PeopleDetails({
  fetchUsers,
}: {
  fetchUsers: () => void;
}) {
  const [name, setName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isAdmin = currentUser?.role === "ADMIN";
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const saveUserName = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingName(false);
    fetchUsers();
  };

  const saveUserEmail = async (email: string) => {
    const updatedUser = { ...user, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingEmail(false);
    fetchUsers();
  };

  const saveUserRole = async (role: string) => {
    const updatedUser = { ...user, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditingRole(false);
    fetchUsers();
  };
  
  const { uid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  
  const deleteUser = async (id: string) => {
    await client.deleteUser(id);
    fetchUsers();
    navigate(`/Kambaz/Account/Users`);
  };
  
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;
  return (
    <div
      className="position-fixed top-0 end-0
                    bottom-0 bg-white p-4 shadow w-25"
    >
      <Link
        to={`/Kambaz/Account/Users`}
        className="btn position-fixed end-0 top-0"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </Link>
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary me-2 fs-1" />
      </div>
      <hr />
      
      {/* Name Section */}
      <div className="text-danger fs-4 wd-name mb-3">
        {!editingName && isFacultyOrAdmin && (
          <FaPencil onClick={() => setEditingName(true)}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editingName && (
          <FaCheck onClick={() => saveUserName()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editingName && (
          <div className="wd-name"
               onClick={() => isFacultyOrAdmin && setEditingName(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editingName && (
          <input className="form-control w-75 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUserName(); }}}
          />
        )}
      </div>
      
      {/* Email Section - Editable by Admin only */}
      <div className="mb-3">
        <div className="d-flex align-items-center">
          <b className="me-2">Email:</b> 
          {!isAdmin ? (
            <span>{user.email || "Not set"}</span>
          ) : !editingEmail ? (
            <>
              <span className="flex-grow-1">{user.email || "Not set"}</span>
              <FaPencil 
                onClick={() => setEditingEmail(true)}
                className="fs-5 text-primary cursor-pointer" 
              />
            </>
          ) : (
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
              </div>
              <input 
                type="email"
                className="form-control"
                defaultValue={user.email || ""}
                onChange={(e) => setUser({...user, email: e.target.value})}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveUserEmail(user.email);
                  }
                }}
              />
              <button 
                className="btn btn-success"
                onClick={() => saveUserEmail(user.email)}
              >
                <FaCheck />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Role Section - Editable by Admin only */}
      <div className="mb-3">
        <div className="d-flex align-items-center">
          <b className="me-2">Role:</b> 
          {!isAdmin ? (
            <span>{user.role}</span>
          ) : !editingRole ? (
            <>
              <span className="flex-grow-1">{user.role}</span>
              <FaPencil 
                onClick={() => setEditingRole(true)}
                className="fs-5 text-primary cursor-pointer" 
              />
            </>
          ) : (
            <div className="input-group">
              <select 
                className="form-select"
                defaultValue={user.role}
                onChange={(e) => setUser({...user, role: e.target.value})}
              >
                <option value="STUDENT">Student</option>
                <option value="TA">Teaching Assistant</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrator</option>
                <option value="USER">User</option>
              </select>
              <button 
                className="btn btn-success"
                onClick={() => saveUserRole(user.role)}
              >
                <FaCheck />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <b>Login ID:</b>
      <span> {user.loginId || user.username} </span> <br />
      <b>Section:</b> <span> {user.section || "N/A"} </span> <br />
      <b>Total Activity:</b>
      <span>{user.totalActivity || "N/A"}</span>
      <hr />
      {isFacultyOrAdmin && (
        <button onClick={() => deleteUser(uid)}
                className="btn btn-danger float-end" >
          Delete 
        </button>
      )}
      <button onClick={() =>
         navigate(`/Kambaz/Account/Users`)}
              className="btn btn-secondary float-end me-2" > 
        Cancel 
      </button>
    </div>
  );
}
