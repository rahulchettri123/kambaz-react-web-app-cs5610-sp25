import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addEnrollment, setEnrollments } from "./Courses/Enrollments/reducer";
import * as enrollmentClient from "./Courses/Enrollments/client";
import * as courseClient from "./Courses/client";

// Update card styling to prevent stretching
const cardStyle = {
  marginBottom: "20px",
  transition: "transform 0.3s ease",
  minHeight: "400px", // Fixed height instead of 100%
  display: "flex",
  flexDirection: "column" as "column"
};

const cardHoverStyle = {
  transform: "translateY(-5px)",
  boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
};

export default function Dashboard({
  addNewCourse,
  deleteCourse,
  courses,
  course,
  setCourse,
  updateCourse,
  enrolling, setEnrolling,
  updateEnrollment
}: {
  addNewCourse: () => void;
  deleteCourse: (id: string) => void;
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  updateCourse: (id: string) => void;
  enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void 
}) {
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isAdmin = currentUser?.role === "ADMIN";
  const isFaculty = currentUser?.role === "FACULTY";

  // Fetch enrollments when component mounts
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          const userEnrollments = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
          dispatch(setEnrollments(userEnrollments));
        } catch (error) {
          console.error("Error fetching enrollments:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEnrollments();
  }, [currentUser, dispatch]);

  // Refresh courses periodically for students
  useEffect(() => {
    if (currentUser?.role === "STUDENT") {
      // Refresh courses every 30 seconds
      const intervalId = setInterval(async () => {
        try {
          // Fetch all available courses
          const allCourses = await courseClient.fetchAllCourses();
          // Update the courses in parent component
          if (JSON.stringify(courses) !== JSON.stringify(allCourses)) {
            console.log("New courses available! Refreshing...");
            // Update the parent's courses state (through props) 
            // This is a workaround since we can't directly update the courses state from here
            if (courses.length !== allCourses.length) {
              window.location.reload(); // Force reload to see new courses (not ideal, but works)
            }
          }
        } catch (error) {
          console.error("Error refreshing courses:", error);
        }
      }, 30000); // 30 seconds

      return () => clearInterval(intervalId);
    }
  }, [currentUser, courses]);

  // Log courses for debugging
  useEffect(() => {
    console.log("Courses updated:", courses.length);
  }, [courses]);

  if (!currentUser) {
    return null;
  }

  const isEnrolled = (courseId: string) => {
    // Check both the enrollment data from API and the course.enrolled flag
    const enrollmentExists = enrollments.some(
      (enrollment: any) => 
        // Check both enrollment structure types
        (enrollment.user === currentUser._id && enrollment.course === courseId) ||
        (enrollment._id === `${currentUser._id}-${courseId}`)
    );
    
    // Also check if the course itself has the enrolled flag
    const courseHasEnrolledFlag = courses.find(
      (c: any) => c._id === courseId && c.enrolled === true
    );
    
    return enrollmentExists || !!courseHasEnrolledFlag;
  };

  const handleDeleteClick = (courseId: string) => {
    setCourseToDelete(courseId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete);
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  // Filter courses based on user role and enrolling state
  // Faculty/Admin see all courses, Students see either all courses or just enrolled courses based on enrolling state
  const filteredCourses = isFacultyOrAdmin || enrolling
    ? courses // Show all courses for faculty/admin or when "All Courses" is selected
    : courses.filter((course) => isEnrolled(course._id)); // Show only enrolled courses when "My Courses" is selected
  
  // When showing all courses for students, sort available courses first
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if ((currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && enrolling) {
      const aEnrolled = isEnrolled(a._id);
      const bEnrolled = isEnrolled(b._id);
      
      if (aEnrolled && !bEnrolled) return 1; // a is enrolled, b is not - b comes first
      if (!aEnrolled && bEnrolled) return -1; // a is not enrolled, b is - a comes first
    }
    // Otherwise, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });

  if (loading) {
    return <div className="p-5 text-center">Loading courses and enrollments...</div>;
  }

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">Dashboard {currentUser.username}</h1>
        
        {/* Only show the toggle button for students and faculty, not for admin */}
        {(currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && (
          <button onClick={() => setEnrolling(!enrolling)} className="btn btn-primary">
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </div>
      <hr />

      {/* Course Management Section - Visible to both Faculty and Admin */}
      {isFacultyOrAdmin && (
        <div className="mb-4 p-3 border rounded bg-light">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="m-0">New Course</h5>
            <div className="d-flex gap-2">
              <Button
                variant="success"
                onClick={() => updateCourse(course._id)}
              >
                Save
              </Button>
              <button className="btn btn-primary" onClick={addNewCourse}>
                Add
              </button>
            </div>
          </div>
          <input
            className="form-control mb-2"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
            placeholder="Course Name"
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            placeholder="Course Description"
            rows={3}
          />
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {isAdmin
            ? "All Courses" 
            : (enrolling ? "All Courses" : "My Courses")} ({sortedCourses.length})
        </h2>
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        {/* When showing all courses, separate available and enrolled courses for students and faculty */}
        {(currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && enrolling && (
          <>
            <h3 className="mb-3 text-success">
              Available for Enrollment ({sortedCourses.filter(course => !isEnrolled(course._id)).length})
            </h3>
            <Row className="g-4 mb-4">
              {sortedCourses
                .filter(course => !isEnrolled(course._id))
                .map((course) => (
                  <Col key={course._id} xs={12} md={6} lg={4} className="wd-dashboard-course">
                    <Card 
                      className="border-success" 
                      style={hoveredCard === course._id ? {...cardStyle, ...cardHoverStyle} : cardStyle}
                      onMouseEnter={() => setHoveredCard(course._id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Card.Img
                        variant="top"
                        width="100%"
                        src="/images/reactjs.jpg"
                        height={160}
                      />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                        Available
                      </span>
                      <Card.Body style={{ flex: 1 }}>
                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}
                        </Card.Title>
                        <Card.Text
                          className="wd-dashboard-course-description overflow-hidden mb-4"
                          style={{ height: "75px" }}
                        >
                          {course.description}
                        </Card.Text>
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center">
                            <Button
                              variant="success"
                              onClick={() => updateEnrollment(course._id, true)}
                            >
                              Enroll
                            </Button>
                            {isFacultyOrAdmin && (
                              <div className="d-flex gap-2">
                                <Button
                                  variant="warning"
                                  id="wd-edit-course-click"
                                  onClick={() => setCourse(course)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() => handleDeleteClick(course._id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
            
            <h3 className="mb-3 text-primary">
              Your Enrolled Courses ({sortedCourses.filter(course => isEnrolled(course._id)).length})
            </h3>
          </>
        )}
        
        <Row className="g-4">
          {((currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && enrolling
              ? sortedCourses.filter(course => isEnrolled(course._id))
              : sortedCourses
            ).map((course) => (
              <Col key={course._id} xs={12} md={6} lg={4} className="wd-dashboard-course">
                <Card 
                  className={isEnrolled(course._id) ? "border-primary" : ""}
                  style={hoveredCard === course._id ? {...cardStyle, ...cardHoverStyle} : cardStyle}
                  onMouseEnter={() => setHoveredCard(course._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Card.Img
                    variant="top"
                    width="100%"
                    src="/images/reactjs.jpg"
                    height={160}
                  />
                  {!isEnrolled(course._id) && (currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && !enrolling && (
                    <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                      Available
                    </span>
                  )}
                  {isEnrolled(course._id) && (
                    <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                      Enrolled
                    </span>
                  )}
                  <Card.Body style={{ flex: 1 }}>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden mb-4"
                      style={{ height: "75px" }}
                    >
                      {course.description}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          {(isEnrolled(course._id) || isFacultyOrAdmin) ? (
                            <Link
                              to={`/Kambaz/Courses/${course._id}/Home`}
                              className="text-decoration-none"
                            >
                              <Button variant="primary">Go</Button>
                            </Link>
                          ) : (
                            (currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && !enrolling && (
                              <Button
                                variant="success"
                                onClick={(event) => {
                                  event.preventDefault();
                                  updateEnrollment(course._id, true);
                                }}
                              >
                                Enroll
                              </Button>
                            )
                          )}
                        </div>
                        
                        <div className="d-flex gap-2">
                          {(currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && isEnrolled(course._id) && (
                            <Button
                              variant="danger"
                              onClick={(event) => {
                                event.preventDefault();
                                updateEnrollment(course._id, false);
                              }}
                            >
                              Unenroll
                            </Button>
                          )}
                          
                          {isFacultyOrAdmin && (
                            <>
                              <Button
                                variant="warning"
                                id="wd-edit-course-click"
                                onClick={() => setCourse(course)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteClick(course._id)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this course? This action cannot be undone.
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
    </div>
  );
}
