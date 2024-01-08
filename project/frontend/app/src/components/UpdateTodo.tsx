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
  Input,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

type UpdateTodoProps = {
  id: number;
  item: string;
  getTodos: () => void;
};

export const UpdateTodo: FC<UpdateTodoProps> = memo(({ id, item, getTodos }) => {
  const [todo, setTodo] = useState(item);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const API_URL = process.env.REACT_APP_API_URL;

  const onClickModalOpen = useCallback(() => onOpen(), [onOpen]);

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  const onClickUpdateTodo = useCallback(
    async (id: number, item: string) => {
      await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: item }),
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
            <ModalHeader>Task Update</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormControl>
                  <FormLabel>Task rename</FormLabel>
                  <Input value={todo} onChange={onChangeTodo}></Input>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => onClickUpdateTodo(id, todo)}>Done</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Button mr="2" onClick={onClickModalOpen}>
        Update
      </Button>
    </>
  );
});
