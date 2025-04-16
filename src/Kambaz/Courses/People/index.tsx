import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PeopleTable from "./Table";
import * as client from "./client";
import { FaPlus, FaExclamationCircle } from "react-icons/fa";
import UserAddModal from "./UserAddModal";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Check if user is faculty or admin
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  const fetchUsers = async () => {
    if (!cid) return;
    
    try {
      setLoading(true);
      setError(null);
      const courseUsers = await client.findUsersForCourse(cid);
      setUsers(courseUsers || []);
    } catch (err) {
      console.error("Error fetching users for course:", err);
      setError("Failed to load users for this course. Please try again later.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (!cid) return;
    
    try {
      if (role) {
        // This would ideally filter by role within the course
        // For now, just refetch and filter client-side
        const allUsers = await client.findUsersForCourse(cid);
        setUsers((allUsers || []).filter((user: any) => user.role === role));
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error("Error filtering users:", err);
      setError("Failed to filter users. Please try again.");
    }
  };
  
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (!cid) return;
    
    try {
      if (name) {
        // Filter by name client-side for now
        const allUsers = await client.findUsersForCourse(cid);
        setUsers((allUsers || []).filter((user: any) => {
          const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
          return fullName.includes(name.toLowerCase());
        }));
      } else {
        fetchUsers();
      }
    } catch (err) {
      console.error("Error filtering users by name:", err);
      setError("Failed to search users. Please try again.");
    }
  };
  
  const removeUser = async (userId: string) => {
    if (!cid || !isFacultyOrAdmin) return;
    
    try {
      await client.removeUserFromCourse(cid, userId);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error removing user from course:", error);
      setError("Failed to remove user. Please try again.");
    }
  };
  
  const addExistingUser = async (userId: string) => {
    if (!cid || !isFacultyOrAdmin) return;
    
    try {
      await client.enrollUserInCourse(cid, userId);
      fetchUsers(); // Refresh the list
      setShowModal(false);
    } catch (error) {
      console.error("Error adding user to course:", error);
      setError("Failed to add user to course. Please try again.");
    }
  };
  
  const createUser = async (newUser: any) => {
    if (!cid || !isFacultyOrAdmin) return;
    
    try {
      await client.createUserAndEnroll(cid, newUser);
      fetchUsers(); // Refresh the list
      setShowModal(false);
    } catch (error) {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again.");
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, [cid]);
  
  return (
    <div className="container-fluid">
      <h2>
        People
        {isFacultyOrAdmin && (
          <button 
            onClick={() => setShowModal(true)}
            className="float-end btn btn-danger">
            <FaPlus className="me-2" />
            Add People
          </button>
        )}
      </h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          <FaExclamationCircle className="me-2" />
          {error}
        </div>
      )}
      
      <div className="row mb-3">
        <div className="col-md-4">
          <input 
            placeholder="Search people" 
            value={name}
            onChange={(e) => filterUsersByName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <select 
            value={role} 
            onChange={(e) => filterUsersByRole(e.target.value)}
            className="form-select">
            <option value="">All Roles</option>
            <option value="STUDENT">Students</option>
            <option value="TA">Teaching Assistants</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Administrators</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading users...</p>
        </div>
      ) : users.length > 0 ? (
        <PeopleTable 
          users={users} 
          courseId={cid} 
          isFacultyOrAdmin={isFacultyOrAdmin}
          removeUser={removeUser}
        />
      ) : (
        <div className="alert alert-info" role="alert">
          <div className="text-center">
            <p className="mb-0">No users are enrolled in this course yet.</p>
            {isFacultyOrAdmin && (
              <button 
                className="btn btn-primary mt-3"
                onClick={() => setShowModal(true)}>
                <FaPlus className="me-2" />
                Add People to This Course
              </button>
            )}
          </div>
        </div>
      )}
      
      {showModal && (
        <UserAddModal 
          show={showModal}
          handleClose={() => setShowModal(false)}
          addExistingUser={addExistingUser}
          createUser={createUser}
          courseId={cid || ""}
        />
      )}
    </div>
  );
} 