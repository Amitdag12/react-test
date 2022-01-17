import React from "react";
import ToDo from "./ToDo";
export default function ({ todos,UpdateChecked,pageNum }) {
  console.log(todos);
  console.log(todos.slice((19*pageNum),19*(pageNum+1)));
  return todos.slice(19*pageNum,19*(pageNum+1)).map((todo) => {
      return <ToDo key={todo.id} todo={todo} UpdateChecked={UpdateChecked} />;
  });
}
