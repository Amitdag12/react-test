import { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
function App() {
  var pageNum = 0;
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef()
  useEffect(() => {
    const stored = localStorage.getItem("todo");
    if (stored) setTodos(JSON.parse(stored));
    pageNum = localStorage.getItem("pageNum");
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
  function ClearToDo() {
    setTodos([]);
  }
  function UpdateChecked(id) {
    const todosList = [...todos];
    console.log(todosList);
    console.log(id);
    const todo = todosList.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(todosList);
  }
  function ClearDoneToDo() {
    setTodos(prevTodos => {
      const notDone = []
      prevTodos.map(todo => {
        if (!todo.complete) notDone.push(todo)
      })
      return notDone;
    });
  }
  function NextPage() {
    pageNum = pageNum + 1;
    localStorage.setItem("pageNum", pageNum);
    setTodos(prevTodos => {
      console.log(prevTodos);
     
        prevTodos.push(prevTodos.shift())
        
      
      console.log(prevTodos);
      return prevTodos;
    });
  }
  return (
    <div>
      <div className="notepad">
        <div className="brownPart"></div>
        <ToDoList todos={todos} UpdateChecked={UpdateChecked} pageNum={pageNum} />
        <button onClick={NextPage} className="nextPage">next</button>
      </div>

      <input ref={todoNameRef} type="text"></input>
      <button onClick={AddTODO}>add to do</button>
      <button onClick={ClearToDo}>clear </button>
      <button onClick={ClearDoneToDo}>clear done </button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
