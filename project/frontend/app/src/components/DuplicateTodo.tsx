import React, { memo, FC, ChangeEvent, useState, useCallback } from "react";
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
import { TodoType } from "../theme/types/api/TodoType";

type DuplicateTodoProps = {
  id: number;
  item: string;
  getTodos: () => void;
};

export const DuplicateTodo: FC<DuplicateTodoProps> = memo(({ id, item, getTodos }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [todos, setTodos] = useState<Array<TodoType>>([]);

    const API_URL = process.env.REACT_APP_API_URL;

    const onClickModalOpen = useCallback(() => onOpen(), [onOpen]);

    const onClickDuplicateTodo = useCallback(
      async (item: string) => {
        const newTodo = {
          "id": todos.length + 1,
          "summary": item
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

        onClose();
        getTodos();
      },
      [onClose, getTodos]
    );

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
                      <FormLabel>this task Duplicate?</FormLabel>
                      <FormHelperText>{item}</FormHelperText>
                    </FormControl>
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={() => onClickDuplicateTodo(item)}>Done</Button>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
          <Button mr="2" onClick={onClickModalOpen}>Duplicate</Button>
        </>
      );
    });
