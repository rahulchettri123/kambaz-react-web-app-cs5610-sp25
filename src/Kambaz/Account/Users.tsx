import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import PeopleDetails from "../Courses/People/Details";
import { FaPlus } from "react-icons/fa";
export default function Users() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isAdmin = currentUser?.role === "ADMIN";
    
    const createUser = async () => {
        const user = await client.createUser({
          firstName: "New",
          lastName: `User${users.length + 1}`,
          username: `newuser${Date.now()}`,
          password: "password123",
          section: "S101",
          role: "STUDENT",
        });
        setUsers([...users, user]);
      };
    
  const [role, setRole] = useState("");
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const users = await client.findUsersByRole(role);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  
  const filterUsersByName = async (name: string) => {
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };

  const [users, setUsers] = useState<any[]>([]);
  const { uid } = useParams();
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, [uid]);
  return (
    <div>
      <PeopleDetails fetchUsers={fetchUsers} />
      <h3>Users 
        {isAdmin && (
          <button onClick={createUser}
                  className="float-end btn btn-danger">
            <FaPlus className="me-2" />
            People
          </button>
        )}
      </h3>
      <input placeholder="Search people" onChange={
               (e) => filterUsersByName(e.target.value)}
             className="form-control float-start w-25"
      />
      <select value={role} onChange={
        (e) =>filterUsersByRole(e.target.value)}
              className="form-select float-start w-25 ms-2 wd-select-role" >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
      <br /><br />
      <PeopleTable users={users} />
    </div>
  );
}
