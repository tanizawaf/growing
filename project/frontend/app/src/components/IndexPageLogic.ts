import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { TodoType } from "../theme/types/api/TodoType";

export const useIndexPageLogic = () => {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) =>
    setTodoName(e.target.value);

  const getTodos = useCallback(async () => {
    try {
      const response: Response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      alert("Error fetching todos");
    }
  }, []);

  const onClickAddTodo = () => {
    if (todoName === "") return;

    const newTodo = {
      summary: todoName,
    };

    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then(() => {
        getTodos();
      })
      .catch(() => {
        alert("Unknown error occurred while adding todo");
      });

    setTodoName("");
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return {
    todoName,
    todos,
    onChangeTask,
    onClickAddTodo,
    getTodos,
  };
};
