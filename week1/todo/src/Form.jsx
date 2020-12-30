import React, { useContext, useRef } from "react";
import { TodoContext } from "./TodoStore";

const Form = () => {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef();

  const addTodoData = e => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", payload: inputRef.current.value });
    inputRef.current.value = ""
  };

  return (
    <form action="">
      <input type="text" ref={inputRef} />
      <button onClick={addTodoData}>할일 추가</button>
    </form>
  );
};

export default Form;
