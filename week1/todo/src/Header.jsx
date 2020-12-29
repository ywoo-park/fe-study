import React, { useContext } from "react";
import { TodoContext } from "./TodoStore";

const Header = () => {
  const { todos } = useContext(TodoContext);

  return (
    <>
      <h1>TODO</h1>
      <div>
        남은 일 : {todos.filter(v => v.status === "todo").length} 개
      </div>
    </>
  );
};
export default Header;