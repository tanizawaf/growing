import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import { useIndexPageLogic } from "./IndexPageLogic";
import { Todo } from "./Todo";

export const IndexPage: FC = () => {
  const { todoName, todos, onChangeTask, onClickAddTodo, getTodos } =
    useIndexPageLogic();

  return (
    <Flex align="center" color="gray.500" justify="center">
      <Box w="400">
        <Stack spacing={6}>
          <Heading as="h1" size="lg" textAlign="center">
            TodoApp
          </Heading>
          <Box w={400}>
            <Stack>
              <Input
                placeholder="Input taskname.."
                value={todoName}
                onChange={onChangeTask}
              />
              <Button colorScheme="teal" onClick={onClickAddTodo}>
                Add
              </Button>
              <Divider my={"5"} />
            </Stack>
          </Box>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              item={todo.summary}
              getTodos={getTodos}
            />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};
