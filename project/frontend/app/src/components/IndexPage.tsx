import React, { ChangeEvent, memo, useCallback, useEffect, useState, FC } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { TodoType } from "../theme/types/api/TodoType";
import { Todo } from "./Todo";

export const IndexPage: FC = memo(() => {
  const [todoName, setTodoName] = useState('');
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  const API_URL = process.env.REACT_APP_API_URL;

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => setTodoName(e.target.value);

  const getTodos = useCallback(async () => {
    const response: Response = await fetch(`${API_URL}/todos`);
    const data = await response.json();
    setTodos(data);
  }, []);

  const onClickAddTodo = () => {
    if (todoName === "") return;
    const newTodo = {
      "id": todos.length + 1,
      "summary": todoName
    };

    fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo)
    }).then(() => {
      getTodos();
    }).catch(() => {
      alert("unknown posted error");
    });

    setTodoName("");
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <Flex
      align="center"
      color="gray.500"
      justify="center"
    >
      <Box w="400">
        <Stack spacing={6}>
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
          >
            TodoApp
          </Heading>
          <Box w={400}>
            <Stack>
              <Input
                placeholder="Input taskname.."
                value={todoName}
                onChange={onChangeTask}
              />
              <Button
                colorScheme="teal"
                onClick={onClickAddTodo}
              >
                Add
              </Button>
              <Divider my={"5"} />
            </Stack>
          </Box>
          {todos.map((todo) => (
            <Todo
              key={todo.summary}
              id={todo.id}
              item={todo.summary}
              getTodos={getTodos} // ここで getTodos を渡す
            />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
});
