import { ListGroup } from "react-bootstrap";

export default function TodoForm({
  todo,
  setTodo,
  addTodo,
  updateTodo,
}: {
  todo: { id: string; title: string };
  setTodo: (todo: { id: string; title: string }) => void;
  addTodo: (todo: { id: string; title: string }) => void;
  updateTodo: (todo: { id: string; title: string }) => void;
}) {
  return (
    <ListGroup.Item style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px" }}>
      <input
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        style={{
          flex: "1",
          padding: "8px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button onClick={() => updateTodo(todo)} style={{ backgroundColor: "orange", color: "white", padding: "6px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Update
      </button>
      <button onClick={() => addTodo(todo)} style={{ backgroundColor: "green", color: "white", padding: "6px 10px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Add
      </button>
    </ListGroup.Item>
  );
}
