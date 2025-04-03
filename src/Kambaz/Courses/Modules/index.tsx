import { ListGroup } from "react-bootstrap";
import { setModules,addModule, editModule,
  updateModule, deleteModule }
from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../../LessonControlButtons";
// import { db } from "../../Database";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ModulesControls from "./ModulesControls";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

import ModuleControlButtons from "./ModuleControlButtons";
export default function Modules() {
  const { cid } = useParams();
  // const _modules = db.modules.filter((m: any) => m.course === cid);
  // const [modules, setModules] = useState<any>(_modules);
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector(
    (state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };



  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  useEffect(() => {
    fetchModules();
  }, []);

  // const addModule = () => {
  //   setModules([
  //     ...modules,
  //     {
  //       _id: new Date().getTime().toString(),
  //       name: moduleName,
  //       course: cid,
  //       lessons: [],
  //     },
  //   ]);
  //   setModuleName("");
  // };
  // const deleteModule = (moduleId: string) => {
  //   setModules(modules.filter((m) => m._id !== moduleId));
  // };
  // const editModule = (moduleId: string) => {
  //   setModules(
  //     modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m))
  //   );
  // };
  // const updateModule = (module: any) => {
  //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
  // };
  // const { modules } = useSelector(
  //   (state: any) => state.modulesReducer);
  // const dispatch = useDispatch();

  return (
    <div className="container-fluid">
      <div>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={createModuleForCourse} />

      </div>

      <ListGroup className="rounded-0 container-fluid">
        {modules.map((module : any) => (
          <ListGroup.Item
            className="wd-module
                      p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
            {!module.editing && module.name}
      { module.editing && (
        <input className="form-control w-50 d-inline-block"
          onChange={(e) => dispatch(
            updateModule({ ...module, name: e.target.value }))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveModule({ ...module, editing: false });

            }}}
          defaultValue={module.name} />)}
              <ModuleControlButtons moduleId={module._id}
        deleteModule={(moduleId) => removeModule(moduleId)}

        editModule={(moduleId) =>
          dispatch(editModule(moduleId))} />
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      
    </div>
  );
}
