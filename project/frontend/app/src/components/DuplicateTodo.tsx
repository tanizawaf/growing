import React, { memo, FC, ChangeEvent, useState, useCallback } from "react";
import { TodoType } from "../theme/types/api/TodoType";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

type DuplicateTodoProps = {
  id: number;
  item: string;
  getTodos: () => void;
};

// 参考）UpdateTodo,IndexPageLogic
export const DuplicateTodo: FC<DuplicateTodoProps> = memo(({ id, item, getTodos }) => {
  // IndexPageLogicより。タスクリストの配列
  const [todos, setTodos] = useState<Array<TodoType>>([]);  
  // おまじない（モーダル）？、API指定
  const { isOpen, onOpen, onClose } = useDisclosure();
  const API_URL = process.env.REACT_APP_API_URL;

  const onClickModalOpen = useCallback(() => onOpen(), [onOpen]);

  // タスクの複製。参考）IndexPageLogic
  const onClickDuplicateTodo = () => { 
    const newTodo = {
        id:todos.length + 1,
        summary: item,
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
          alert("Unknown error occurred while duplicating todo");
        });
  
        onClose();
        getTodos();
  };

  //
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Task Duplicate</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormControl>
                  <FormLabel>this task duplicate?</FormLabel>
                  <FormHelperText>{item}</FormHelperText>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => onClickDuplicateTodo()}>Done</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Button mr="2" onClick={onClickModalOpen}>Duplicate</Button>
    </>
  );
});