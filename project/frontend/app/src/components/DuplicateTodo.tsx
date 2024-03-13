import React, { memo, FC, useState, useCallback } from "react";
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

export const DuplicateTodo: FC<DuplicateTodoProps> = memo(({item, getTodos }) => {
  // 複製対象のTodoリストを取得
  const [todo, setTodo] = useState(item);
  // Todoリストの一覧取得
  const [todos, setTodos] = useState<Array<TodoType>>([]);
  // モーダルの？？？
  const { isOpen, onOpen, onClose } = useDisclosure();

  const API_URL = process.env.REACT_APP_API_URL;

  // モーダルの起動
  const onClickModalOpen = useCallback(() => onOpen(), []);

  // タスクの複製関数
  const onClickDuplicateTodo = async (item: string) => {
      // 複製するタスクのインスタンス作成
      const dupTodo = {
        id: todos.length + 1,
        summary: item,
      };
      
      // タスク作成APIの呼び出し
      fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dupTodo),
      })
        .then(() => {
          getTodos();
        })
        .catch(() => {
          alert("Unknown error occurred while adding todo");
        });
  
      // モーダルのクローズ
      onClose();

      setTodo("");
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
              <Button onClick={() => onClickDuplicateTodo(todo)}>Done</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      <Button mr="3" onClick={onClickModalOpen}>
        Duplicate
      </Button>
    </>
  );
});
