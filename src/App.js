import { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()
  useEffect(() => {
    const stored=localStorage.getItem("todo");
    if (stored) setTodos(JSON.parse(stored));
  }, [])
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos))
    
  }, [todos])
  function AddTODO(e) {
    const name = todoNameRef.current.value
    if (name === "") return
    console.log(name);
    setTodos(prevTodos => {
      let id = 0;
      if (prevTodos.length > 0) {
        id = prevTodos[prevTodos.length - 1].id + 1;
      }
      return [...prevTodos, { id: id, name: name, complete: false }]
    })
    todoNameRef.current.value = null;
  }
  function ClearToDo(){
    setTodos([]);
  }
  function UpdateChecked(id) {
    const todosList=[...todos];
    console.log(todosList);
    console.log(id);
    const todo=todosList.find(todo=>todo.id===id);
    todo.complete=!todo.complete;
    setTodos(todosList);
  }
  function ClearDoneToDo(){
    setTodos(prevTodos => {
      const notDone=[]
      prevTodos.map(todo=>{
        if(!todo.complete) notDone.push(todo)
      })
      return notDone;
    });
  }
  return (
    <div>
      <ToDoList todos={todos} UpdateChecked={UpdateChecked}/>
      <input ref={todoNameRef} type="text"></input>
      <button onClick={AddTODO}>add to do</button>
      <button onClick={ClearToDo}>clear </button>
      <button onClick={ClearDoneToDo}>clear done </button>
      <div>{todos.filter(todo=>!todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
