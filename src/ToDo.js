import React from "react";
export default function ToDo({ todo,UpdateChecked }) {
  function Check() {
    UpdateChecked(todo.id);
  }
  return (
    <div className="listItem">
      <label >
        <input type="checkbox" onChange={Check} checked={todo.complete}></input>
        {todo.name}
      </label>
    </div>
  );
}
