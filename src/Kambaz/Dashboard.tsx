import { Button, Card, Col, Row, Modal } from "react-bootstrap";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addEnrollment, removeEnrollment } from "./Courses/Enrollments/reducer";

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
  const [showAllCourses, setShowAllCourses] = useState(false);

  if (!currentUser) {
    return null;
  }

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  const handleEnroll = (courseId: string) => {
    const newEnrollment = {
      _id: Date.now().toString(),
      user: currentUser._id,
      course: courseId,
    };
    dispatch(addEnrollment(newEnrollment));
  };

  const handleUnenroll = (enrollmentId: string) => {
    dispatch(removeEnrollment(enrollmentId));
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
  const filteredCourses = currentUser.role === "FACULTY" || showAllCourses
    ? courses 
    : courses.filter((course) => isEnrolled(course._id));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard {currentUser.username}</h1> <hr />

      {/* Course Management Section - Only visible to Faculty */}
      {currentUser.role === "FACULTY" && (
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
            : (showAllCourses ? "All Courses" : "Enrolled Courses")} ({filteredCourses.length})
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
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Card.Img
                  variant="top"
                  width="100%"
                  src="/images/reactjs.jpg"
                  height={160}
                />
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
                    {isEnrolled(course._id) ? (
                      <>
                        <Link
                          to={`/Kambaz/Courses/${course._id}/Home`}
                          className="text-decoration-none"
                        >
                          <Button variant="primary">Go</Button>
                        </Link>
                        {currentUser.role === "STUDENT" && (
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
                      currentUser.role === "STUDENT" && (
                        <Button
                          variant="success"
                          onClick={() => handleEnroll(course._id)}
                        >
                          Enroll
                        </Button>
                      )
                    )}
                    {currentUser.role === "FACULTY" && (
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
