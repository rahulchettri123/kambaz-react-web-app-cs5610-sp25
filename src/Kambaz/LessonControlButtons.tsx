import { IoEllipsisVertical }
  from "react-icons/io5";
import GreenCheckmark from "./Courses/Modules/GreenCheckmark";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
);}
