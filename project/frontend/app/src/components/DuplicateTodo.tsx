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
import { FC, memo, useCallback, useState } from "react";

type DuplicateTodoProps = {
  id: number;
  item: string;
  getTodos: () => void;
};

export const DuplicateTodo: FC<DuplicateTodoProps> = memo(
  ({ id, item, getTodos }) => {
    const [todo, setTodo] = useState(item);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const API_URL = process.env.REACT_APP_API_URL;

    const onClickModalOpen = useCallback(() => onOpen(), [onOpen]);

    const onClickDuplicateTodo = () => {
      const newTodo = {
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
          alert("Unknown error occurred while adding todo");
        });

      onClose();
      getTodos();
    };

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
                <Stack spacing={1} direction="row">
                  <Button
                    colorScheme="blue"
                    onClick={() => onClickDuplicateTodo()}
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
          Duplicate
        </Button>
      </>
    );
  }
);
