import Lab1 from "./Lab1";
import Lab3 from "./Lab3";
import Lab2 from "./Lab2";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
export default function Labs() {
  return (
    <div>
      <h1>Rahul Chettri</h1>
      <h1>Email : chettri.ra@northeastern.edu</h1>
      <h1>
        <a
          href="https://github.com/rahulchettri123/kambaz-react-web-app-cs5610-sp25"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link to Kambaz React Web App - CS5610 SP25
        </a>
      </h1>

      <h1>Labs</h1>
      <TOC />
      <Routes>
        <Route path="/" element={<Navigate to="Lab1" />} />
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3" element={<Lab3 />} />
      </Routes>
    </div>
  );
}
