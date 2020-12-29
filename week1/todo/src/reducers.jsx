const todoReducer = (todos, { type, payload }) => {
    switch (type) {
      case "ADD_TODO": {
        const newTodoData = {
          id: todos.length + 1,
          title: payload,
          status: "todo"
        };
  
        return [...todos, newTodoData];
      }
  
      case "SET_INIT_DATA":
        return payload;
  
      case "CHANGE_TODO_STATUS":
        return todos.map(todo => {
          if (todo.id !== +payload) return todo;
          if (todo.status === "todo") todo.status = "done";
          else todo.status = "todo";
          return todo;
        });
  
      default:
        break;
    }
  };
  
  export default todoReducer;