import React, { useContext } from "react";
import "./Item.css";
import { TodoContext } from "./TodoStore";

const Item = ({ todo }) => {
  const { dispatch } = useContext(TodoContext);
  const toggleItem = e => {
    const id = e.target.dataset.id;
    dispatch({ type: "CHANGE_TODO_STATUS", payload: id });
  };

  return (
    <li data-id={todo.id} className={"" + todo.status} onClick={toggleItem}>
      {todo.title}
    </li>
  );
};

export default Item;