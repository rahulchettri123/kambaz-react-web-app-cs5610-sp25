import { FaAlignJustify } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import People from "./People";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as assignmentClient from "./Assignments/client";

// import { db } from "../Database";
export default function Courses({courses}: {courses: any[]}) {
  const { cid } = useParams();
  const course = courses.find((c: any) => c._id == cid);
  const { pathname } = useLocation();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const [currentPageTitle, setCurrentPageTitle] = useState<string>("");
  
  const getPageTitle = (pathname: string) => {
    const lastSegment = pathname.split("/").pop() || "";
    switch (lastSegment) {
      case "Home":
        return "Home";
      case "Modules":
        return "Modules";
      case "Assignments":
        return "Assignments";
      case "People":
        return "People";
      default:
        if (pathname.includes("/Assignments/") && lastSegment) {
          const assignment = assignments.find((a: any) => a._id === lastSegment);
          return assignment ? assignment.title : "Assignment Editor";
        }
        return lastSegment;
    }
  };
  
  useEffect(() => {
    setCurrentPageTitle(getPageTitle(pathname));
  }, [pathname, assignments]);
  
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        if (cid) {
          await assignmentClient.findAssignmentsForCourse(cid);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    
    fetchAssignments();
  }, [cid]);
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {currentPageTitle || pathname.split("/").pop()}
      </h2>

      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/:aid" element={<AssignmentEditor />} />
          <Route path="People" element={<People />} />
        </Routes>
      </div>
    </div>
  );
}
