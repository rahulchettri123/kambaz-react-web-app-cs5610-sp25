import { FaPlus } from "react-icons/fa6";
import ModuleEditor from "./ModuleEditor";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import { useState } from "react";
export default function ModulesControls({ moduleName, setModuleName, addModule }:
  { moduleName: string; setModuleName:
  (title: string) => void; addModule: () => void; }) {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="me-1 float-end" onClick={handleShow}>
        <FaPlus className="position-relative me-2"
                style={{ bottom: "1px" }} />
         Module </Button>
         <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                    show={show} handleClose={handleClose}
                    setModuleName={setModuleName} addModule={addModule} />

      <Dropdown className="float-end me-2">
        <Dropdown.Toggle variant="secondary" size="lg">
          <GreenCheckmark />
          Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
         <Dropdown.Item>
           <GreenCheckmark />
           Publish All
         </Dropdown.Item>
         <Dropdown.Item>
           <GreenCheckmark />
           Publish all modules and items
         </Dropdown.Item>
       </Dropdown.Menu>
     </Dropdown>
  </div>
);}
