import React from "react";
import TodoStore from "./TodoStore";
import Header from "./Header";
import Form from "./Form";
import List from "./List";

const App = () => {
  return (
    <TodoStore>
      <Header />
      <Form />
      <List />
    </TodoStore>
  );
};

export default App;
