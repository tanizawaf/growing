import React, { memo, FC, useCallback } from "react";
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

type DeletedTodoProps = {
  id: number;
  item: string;
  getTodos: () => void;
};

export const DeletedTodo: FC<DeletedTodoProps> = memo(({ id, item, getTodos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const API_URL = process.env.REACT_APP_API_URL;

  const onClickModalOpen = useCallback(() => onOpen(), []);

  const onClickDeletedTodo = async (id: number) => {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    onClose();
    getTodos();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Task Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormControl>
                  <FormLabel>this task delete?</FormLabel>
                  <FormHelperText>{item}</FormHelperText>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => onClickDeletedTodo(id)}>Done</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Button onClick={onClickModalOpen}>Delete</Button>
    </>
  );
});
