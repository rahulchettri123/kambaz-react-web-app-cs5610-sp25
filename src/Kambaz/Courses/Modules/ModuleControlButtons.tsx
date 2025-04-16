import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as modulesClient from "./client";
import { useDispatch } from "react-redux";
import { addLesson } from "./reducer";

export default function ModuleControlButtons({
  moduleId, deleteModule, editModule}: {
  moduleId: string; deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void; }) {
    
  const [showModal, setShowModal] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  
  const handleAddLesson = async () => {
    if (!lessonName.trim()) return;
    
    try {
      setIsSubmitting(true);
      
      // Create the lesson object
      const lesson = {
        name: lessonName,
        description: lessonDescription,
      };
      
      // Call the API to add the lesson
      const result = await modulesClient.addLessonToModule(moduleId, lesson);
      
      if (result.success) {
        // Update Redux store
        dispatch(addLesson({ moduleId, lesson: result.lesson }));
        
        // Reset form and close modal
        setLessonName("");
        setLessonDescription("");
        handleClose();
      } else {
        console.error("Failed to add lesson:", result.message);
        alert("Failed to add lesson. Please try again.");
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
      alert("An error occurred while adding the lesson. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="float-end">
      <FaPencil onClick={() => editModule(moduleId)}
                className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1"
       onClick={() => deleteModule(moduleId)}/>

      <GreenCheckmark />
      <BsPlus className="fs-1 text-success" style={{ cursor: "pointer" }} onClick={handleShow} />
      <IoEllipsisVertical className="fs-4" />
      
      {/* Modal for adding a new lesson */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Lesson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Lesson Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lesson name"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter lesson description"
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddLesson}
            disabled={isSubmitting || !lessonName.trim()}
          >
            {isSubmitting ? "Adding..." : "Add Lesson"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
