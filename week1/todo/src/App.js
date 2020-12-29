import React from "react";
import TodoStore from "./TodoStore";
import Header from "./Header";
import Form from "./Form";
import List from "./List";

// 코드 참고: 코드 스쿼드
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
