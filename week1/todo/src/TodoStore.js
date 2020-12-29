import React, { useEffect, useReducer } from "react";
import "./TodoStore.css";
import useFetch from "./useFetch";
import todoReducer from "./reducers";

export const TodoContext = React.createContext();

const TodoStore = props => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const setInitData = initData => {
    dispatch({ type: "SET_INIT_DATA", payload: initData });
  };

  const loading = useFetch(setInitData);

  useEffect(() => {
    console.log("USE EFFECT - REACT HOOKS", todos);
  }, [todos]);

  return (
    <TodoContext.Provider value={{ dispatch, todos, loading }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoStore;