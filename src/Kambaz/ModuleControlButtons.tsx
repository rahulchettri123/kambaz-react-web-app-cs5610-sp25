import { IoEllipsisVertical } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import GreenCheckmark from "./Courses/Modules/GreenCheckmark";

export default function ModuleControlButtons() {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      <GreenCheckmark />
      <AiOutlinePlus className="fs-4 text-dark" />
      <IoEllipsisVertical className="fs-4 text-dark" />
    </div>
  );
}
