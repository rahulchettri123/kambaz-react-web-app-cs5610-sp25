import { useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Tab, Tabs, ListGroup } from "react-bootstrap";
import * as client from "./client";
import { FaUserPlus, FaCheck } from "react-icons/fa";

interface UserAddModalProps {
  show: boolean;
  handleClose: () => void;
  addExistingUser: (userId: string) => void;
  createUser: (user: any) => void;
  courseId: string;
}

export default function UserAddModal({
  show,
  handleClose,
  addExistingUser,
  createUser,
  courseId
}: UserAddModalProps) {
  const [existingUsers, setExistingUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [enrolledUserIds, setEnrolledUserIds] = useState<string[]>([]);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "password123", // Default password
    role: "STUDENT",
    section: "",
  });
  
  // Fetch all users and enrolled users
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all users
        const allUsers = await client.findAllUsers();
        setExistingUsers(allUsers);
        setFilteredUsers(allUsers);
        
        // Get enrolled users to filter them out
        const courseUsers = await client.findUsersForCourse(courseId);
        setEnrolledUserIds(courseUsers.map((user: any) => user._id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    if (show) {
      fetchData();
    }
  }, [show, courseId]);
  
  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(existingUsers);
      return;
    }
    
    const filtered = existingUsers.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const username = user.username?.toLowerCase() || "";
      return fullName.includes(searchTerm.toLowerCase()) || 
             username.includes(searchTerm.toLowerCase());
    });
    
    setFilteredUsers(filtered);
  }, [searchTerm, existingUsers]);
  
  // Handle new user form changes
  const handleInputChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle creating a new user
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a username if not provided
    if (!newUser.username) {
      const username = `${newUser.firstName.toLowerCase()}${newUser.lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;
      createUser({ ...newUser, username });
    } else {
      createUser(newUser);
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add People to Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="existing" id="user-add-tabs">
          <Tab eventKey="existing" title="Add Existing Users">
            <Form.Group className="mb-3 mt-3">
              <Form.Control 
                type="text" 
                placeholder="Search by name or username"
                value={searchTerm}
                onChange={(e: ChangeEvent<any>) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            
            <ListGroup style={{ maxHeight: '300px', overflow: 'auto' }}>
              {filteredUsers
                .filter(user => !enrolledUserIds.includes(user._id))
                .map(user => (
                  <ListGroup.Item 
                    key={user._id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{user.firstName} {user.lastName}</strong>
                      <div className="text-muted small">
                        {user.username} • {user.role}
                      </div>
                    </div>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={() => addExistingUser(user._id)}
                    >
                      <FaUserPlus className="me-1" />
                      Add
                    </Button>
                  </ListGroup.Item>
                ))}
              
              {filteredUsers.length === 0 && (
                <ListGroup.Item className="text-center text-muted">
                  No users found
                </ListGroup.Item>
              )}
              
              {filteredUsers.filter(user => !enrolledUserIds.includes(user._id)).length === 0 && 
               filteredUsers.length > 0 && (
                <ListGroup.Item className="text-center text-muted">
                  All matching users are already enrolled
                </ListGroup.Item>
              )}
            </ListGroup>
          </Tab>
          
          <Tab eventKey="new" title="Create New User">
            <Form onSubmit={handleCreateUser} className="mt-3">
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="firstName"
                      value={newUser.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="lastName"
                      value={newUser.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              
              <Form.Group className="mb-3">
                <Form.Label>Username (optional)</Form.Label>
                <Form.Control 
                  type="text" 
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder="Will be auto-generated if left blank"
                />
              </Form.Group>
              
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select 
                      name="role"
                      value={newUser.role}
                      onChange={handleInputChange}
                    >
                      <option value="STUDENT">Student</option>
                      <option value="TA">Teaching Assistant</option>
                      <option value="FACULTY">Faculty</option>
                      <option value="ADMIN">Administrator</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Section</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="section"
                      value={newUser.section}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </div>
              </div>
              
              <Button variant="success" type="submit" className="mt-2">
                <FaCheck className="me-2" />
                Create User & Add to Course
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
} 