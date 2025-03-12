import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState({ id: "-1", title: "" });

  const addTodo = (todo: any) => {
    if (!todo.title.trim()) return;
    const newTodos = [...todos, { ...todo, id: new Date().getTime().toString() }];
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (todo: any) => {
    if (!todo.title.trim()) return;
    const newTodos = todos.map((item) => (item.id === todo.id ? todo : item));
    setTodos(newTodos);
    setTodo({ id: "-1", title: "" });
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", textAlign: "center" }}>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm todo={todo} setTodo={setTodo} addTodo={addTodo} updateTodo={updateTodo} />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} setTodo={setTodo} />
        ))}
      </ListGroup>
    </div>
  );
}
