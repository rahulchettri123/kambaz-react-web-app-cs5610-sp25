import { ListGroup } from "react-bootstrap";
import {
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
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
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  // Check if user is faculty or admin
  const isFacultyOrAdmin = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  
  const fetchModules = async () => {
    try {
      const modules = await coursesClient.findModulesForCourse(cid!);
      dispatch(setModules(modules));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };
  useEffect(() => {
    fetchModules();
  }, [cid]);
  const deleteModuleHandler = async (moduleId: string) => {
    // Only allow faculty/admin to delete modules
    if (!isFacultyOrAdmin) return;
    
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
 
  const addModuleHandler = async () => {
    // Only allow faculty/admin to add modules
    if (!isFacultyOrAdmin) return;
    
    const newModule = await coursesClient.createModuleForCourse(cid!, {
      name: moduleName,
      course: cid,
    });
    dispatch(addModule(newModule));
    setModuleName("");
  };
  const updateModuleHandler = async (module: any) => {
    // Only allow faculty/admin to update modules
    if (!isFacultyOrAdmin) return;
    
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
      {/* Only show module controls for faculty/admin */}
      {isFacultyOrAdmin && (
        <div>
          <ModulesControls
            addModule={addModuleHandler}
            setModuleName={setModuleName}
            moduleName={moduleName}
          />
        </div>
      )}

      <ListGroup className="rounded-0 container-fluid">
        {modules.map((module: any) => (
          <ListGroup.Item
            className="wd-module
                      p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              {!module.editing && module.name}
              {module.editing && isFacultyOrAdmin && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) =>
                    updateModuleHandler({ ...module, name: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateModuleHandler({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              {/* Only show control buttons for faculty/admin */}
              {isFacultyOrAdmin && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => deleteModuleHandler(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    {/* Only show lesson control buttons for faculty/admin */}
                    {isFacultyOrAdmin && <LessonControlButtons />}
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
