import Account from "./Account";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./styles.css";
import KambazNavigation from "./Navigation";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Session from "./Account/Session";
import ProtectedRoute from "./Account/ProtectedRoute";
export default function Kambaz() {
  
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
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchCourses = async () => {
      try {
        let coursesData;
        if (currentUser?.role === "STUDENT") {
          // For students, fetch all courses to see what's available
          coursesData = await courseClient.fetchAllCourses();
        } else {
          // For faculty/admin, fetch their courses
          coursesData = await userClient.findMyCourses();
        }
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      if (currentUser) {
        fetchCourses();
      }
    }, [currentUser]);
  
  
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
