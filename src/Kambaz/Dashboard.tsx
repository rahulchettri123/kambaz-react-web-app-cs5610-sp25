import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addEnrollment, removeEnrollment, setEnrollments } from "./Courses/Enrollments/reducer";
import * as enrollmentClient from "./Courses/Enrollments/client";
import * as courseClient from "./Courses/client";

export default function Dashboard({
  addNewCourse,
  deleteCourse,
  courses,
  course,
  setCourse,
  updateCourse,
}: {
  addNewCourse: () => void;
  deleteCourse: (id: string) => void;
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  updateCourse: (id: string) => void;
}) {
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);
  const [showAllCourses, setShowAllCourses] = useState(true);
  const [loading, setLoading] = useState(false);

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

  // If the user is a student, default to showing all courses
  useEffect(() => {
    if (currentUser?.role === "STUDENT") {
      setShowAllCourses(true);
    }
  }, [currentUser]);

  // Log courses for debugging
  useEffect(() => {
    console.log("Courses updated:", courses.length);
  }, [courses]);

  if (!currentUser) {
    return null;
  }

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  const handleEnroll = async (courseId: string) => {
    try {
      const newEnrollment = await enrollmentClient.enrollUserInCourse(
        currentUser._id, 
        courseId
      );
      dispatch(addEnrollment(newEnrollment));
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleUnenroll = async (enrollmentId: string) => {
    try {
      await enrollmentClient.unenrollUserFromCourse(enrollmentId);
      dispatch(removeEnrollment(enrollmentId));
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
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

  // Filter courses based on user role and showAllCourses state
  const isFacultyOrAdmin = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";
  const filteredCourses = isFacultyOrAdmin || showAllCourses
    ? courses 
    : courses.filter((course) => isEnrolled(course._id));

  // Sort courses so that available courses (not enrolled) appear first for students
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (currentUser.role === "STUDENT") {
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
      <h1 id="wd-dashboard-title">Dashboard {currentUser.username}</h1> <hr />

      {/* Course Management Section - Only visible to Faculty and Admin */}
      {isFacultyOrAdmin && (
        <div>
          <h5>
            New Course
            <button className="btn btn-primary float-end" onClick={addNewCourse}>
              {" "}
              Add{" "}
            </button>
            <Button
              variant="success"
              className="float-end me-2"
              onClick={() => updateCourse(course._id)}
            >
              Save
            </Button>
          </h5>
          <input
            className="form-control"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </div>
      )}

      <br />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {currentUser.role === "FACULTY" 
            ? "All Courses" 
            : (showAllCourses ? "All Courses" : "Enrolled Courses")} ({sortedCourses.length})
        </h2>
        {currentUser.role === "STUDENT" && (
          <Button
            variant="primary"
            onClick={() => setShowAllCourses(!showAllCourses)}
          >
            {showAllCourses ? "Show Enrolled" : "Show All"}
          </Button>
        )}
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        {currentUser.role === "STUDENT" && showAllCourses && (
          <>
            <h3 className="mb-3 text-success">
              Available for Enrollment ({sortedCourses.filter(course => !isEnrolled(course._id)).length})
            </h3>
            <Row xs={1} md={5} className="g-4 mb-4">
              {sortedCourses
                .filter(course => !isEnrolled(course._id))
                .map((course) => (
                  <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card className="h-100 border-success">
                      <Card.Img
                        variant="top"
                        width="100%"
                        src="/images/reactjs.jpg"
                        height={160}
                      />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                        Available
                      </span>
                      <Card.Body>
                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}
                        </Card.Title>
                        <Card.Text
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "75px" }}
                        >
                          {course.description}
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <Button
                            variant="success"
                            onClick={() => handleEnroll(course._id)}
                          >
                            Enroll
                          </Button>
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
        
        <Row xs={1} md={5} className="g-4">
          {(currentUser.role === "STUDENT" && showAllCourses
              ? sortedCourses.filter(course => isEnrolled(course._id))
              : sortedCourses
            ).map((course) => (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card className={isEnrolled(course._id) ? "h-100 border-primary" : "h-100"}>
                  <Card.Img
                    variant="top"
                    width="100%"
                    src="/images/reactjs.jpg"
                    height={160}
                  />
                  {!isEnrolled(course._id) && currentUser.role === "STUDENT" && !showAllCourses && (
                    <span className="position-absolute top-0 end-0 m-2 badge bg-success">
                      Available
                    </span>
                  )}
                  {isEnrolled(course._id) && (
                    <span className="position-absolute top-0 end-0 m-2 badge bg-primary">
                      Enrolled
                    </span>
                  )}
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "75px" }}
                    >
                      {course.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      {(isEnrolled(course._id) || isFacultyOrAdmin) ? (
                        <>
                          <Link
                            to={`/Kambaz/Courses/${course._id}/Home`}
                            className="text-decoration-none"
                          >
                            <Button variant="primary">Go</Button>
                          </Link>
                          {currentUser.role === "STUDENT" && isEnrolled(course._id) && (
                            <Button
                              variant="danger"
                              onClick={() => {
                                const enrollment = enrollments.find(
                                  (e: any) =>
                                    e.user === currentUser._id &&
                                    e.course === course._id
                                );
                                if (enrollment) {
                                  handleUnenroll(enrollment._id);
                                }
                              }}
                            >
                              Unenroll
                            </Button>
                          )}
                        </>
                      ) : (
                        currentUser.role === "STUDENT" && !showAllCourses && (
                          <Button
                            variant="success"
                            onClick={() => handleEnroll(course._id)}
                          >
                            Enroll
                          </Button>
                        )
                      )}
                      {isFacultyOrAdmin && (
                        <>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteClick(course._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            id="wd-edit-course-click"
                            onClick={() => setCourse(course)}
                          >
                            Edit
                          </Button>
                        </>
                      )}
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
