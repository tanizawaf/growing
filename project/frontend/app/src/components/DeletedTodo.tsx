import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";

type DeletedTodoProps = {
  id: number;
  item: string;
  getTodos: () => void;
};

export const DeletedTodo: FC<DeletedTodoProps> = memo(
  ({ id, item, getTodos }) => {
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
                <Stack spacing={1} direction="row">
                  <Button
                    colorScheme="blue"
                    onClick={() => onClickDeletedTodo(id)}
                  >
                    OK
                  </Button>
                  <Button colorScheme="teal" onClick={() => onClose()}>
                    Cancel
                  </Button>
                </Stack>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
        <Button mr="2" onClick={onClickModalOpen}>
          Delete
        </Button>
      </>
    );
  }
);
