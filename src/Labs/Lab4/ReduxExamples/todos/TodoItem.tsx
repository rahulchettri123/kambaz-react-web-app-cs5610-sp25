import { ListGroup } from "react-bootstrap";

export default function TodoItem({
  todo,
  deleteTodo,
  setTodo,
}: {
  todo: { id: string; title: string };
  deleteTodo: (id: string) => void;
  setTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroup.Item key={todo.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
      {todo.title}
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setTodo(todo)} style={{ backgroundColor: "blue", color: "white", padding: "6px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Edit
        </button>
        <button onClick={() => deleteTodo(todo.id)} style={{ backgroundColor: "red", color: "white", padding: "6px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Delete
        </button>
      </div>
    </ListGroup.Item>
  );
}
