import Account from "./Account";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./styles.css";
import KambazNavigation from "./Navigation";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentClient from "./Courses/Enrollments/client";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Session from "./Account/Session";
import { addEnrollment, removeEnrollment, setEnrollments } from "./Courses/Enrollments/reducer";
import ProtectedRoute from "./Account/ProtectedRoute";
export default function Kambaz() {
 const dispatch = useDispatch();
 const { currentUser } = useSelector((state: any) => state.accountReducer);
 const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
 const [courses, setCourses] = useState<any[]>([]);
 const [course, setCourse] = useState<any>({
   _id: "0",
   name: "New Course",
   number: "New Number",
   startDate: "2023-09-10",
   endDate: "2023-12-15",
   image: "/images/reactjs.jpg",
   description: "New Description",
 });
 
    // const fetchCourses = async () => {
    //   try {
        
    //     if (currentUser?.role === "STUDENT") {
    //       // For students, fetch all courses to see what's available
    //       const coursesData = await courseClient.fetchAllCourses();
    //       setCourses(coursesData);
    //     } else {
    //       // For faculty/admin, fetch their courses
    //       const coursesData = await courseClient.fetchAllCourses();
    //       setCourses(coursesData);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // useEffect(() => {
    //   if (currentUser) {
    //     fetchCourses();
    //   }
    // }, [currentUser]);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    
    // Set enrolling state based on user role - now only admin has forced "All Courses" view
    useEffect(() => {
      if (currentUser?.role === "ADMIN") {
        setEnrolling(true); // Only admin should always see all courses by default
      }
    }, [currentUser]);
    
    const findCoursesForUser = async () => {
      try {
        const courses = await userClient.findCoursesForUser(currentUser._id);
        setCourses(courses);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCourses = async () => {
      try {
        const allCourses = await courseClient.fetchAllCourses();
        const enrolledCourses = await userClient.findCoursesForUser(
          currentUser._id
        );
        const courses = allCourses.map((course: any) => {
          if (enrolledCourses.find((c: any) => c._id === course._id)) {
            return { ...course, enrolled: true };
          } else {
            return course;
          }
        });
        setCourses(courses);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      // Function to fetch data
      const fetchData = async () => {
        try {
          if (currentUser) {
            console.log("Fetching data for user:", currentUser._id);
            
            // Fetch enrollments first
            const userEnrollments = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
            console.log("Fetched enrollments:", userEnrollments.length);
            dispatch(setEnrollments(userEnrollments));
            
            // Then fetch courses based on enrolling state
            if (enrolling) {
              await fetchCourses();
            } else {
              await findCoursesForUser();
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      fetchData();
    }, [currentUser, enrolling]);
   
  
    const addNewCourse = async () => {
      try {
        await userClient.createCourse(course);
        // After adding a course, fetch all courses again to update the UI for all users
        fetchCourses();
        // Reset the course form
        setCourse({
          _id: "0",
          name: "New Course",
          number: "New Number",
          startDate: "2023-09-10",
          endDate: "2023-12-15",
          image: "/images/reactjs.jpg",
          description: "New Description",
        });
      } catch (error) {
        console.error("Error adding course:", error);
      }
    };
  
    const deleteCourse = async (courseId: string) => {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    };
  
    const updateCourse = async () => {
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => {
          if (c._id === course._id) { return course; }
          else { return c; }
      }));
    };
    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
      try {
        if (enrolled) {
          // Enroll
          const newEnrollment = await userClient.enrollIntoCourse(currentUser._id, courseId);
          console.log("Enrollment result:", newEnrollment);
          
          // Add to Redux store
          if (newEnrollment) {
            dispatch(addEnrollment(newEnrollment));
          }
        } else {
          // Unenroll
          const result = await userClient.unenrollFromCourse(currentUser._id, courseId);
          console.log("Unenrollment result:", result);
          
          // Find and remove from Redux store
          const enrollmentToRemove = enrollments.find(
            (e: any) => (e.user === currentUser._id && e.course === courseId) || 
                       e._id === `${currentUser._id}-${courseId}`
          );
          
          if (enrollmentToRemove) {
            dispatch(removeEnrollment(enrollmentToRemove._id));
          }
        }
        
        // Force refresh enrollments and courses
        const updatedEnrollments = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
        dispatch(setEnrollments(updatedEnrollments));
        
        // Re-fetch courses to make sure UI is updated correctly
        if (enrolling) {
          fetchCourses();
        } else {
          findCoursesForUser();
        }
      } catch (error) {
        console.error("Error updating enrollment:", error);
      }
    };
   
  return (
    <Session>
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className = "wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard 
          addNewCourse={addNewCourse}
          deleteCourse={deleteCourse}
          courses={courses}
          course={course}
          setCourse={setCourse}
          updateCourse={updateCourse}
          enrolling={enrolling} setEnrolling={setEnrolling}
          updateEnrollment={updateEnrollment}
          /></ProtectedRoute>} />
          <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
    </Session>
  );
}
