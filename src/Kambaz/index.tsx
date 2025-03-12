import Account from "./Account";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./styles.css";
import KambazNavigation from "./Navigation";
import {db} from "./Database"
import Courses from "./Courses";
import { useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
export default function Kambaz() {
  const [courses, setCourses] = useState(db.courses);
    const [course, setCourse] = useState<any>({
      _id: "0",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg",
      description: "New Description",
    });
  
    const addNewCourse = () => {
      const newCourse = { ...course, _id: new Date().getTime().toString() };
      setCourses([...courses, { ...course, ...newCourse }]);
    };
    const deleteCourse = (courseId: string) => {
      setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = () => {
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })    );  };
  
  return (
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
  );
}
