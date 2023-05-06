import React, { ReactElement, useState } from "react";
import { useUserStore } from "../store/UserStore";
import { useClassroomStore } from "../store/ClassroomStore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Task } from "../models/Tasks";
import { getRandomId } from "../helpers/string";
import Layout from "../components/Layout";

const ClassPages = () => {
  const { user } = useUserStore();
  const { classroom, updateClassroom, setClassroom } = useClassroomStore();
  const [taskLabel, setTaskLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const addTask = async () => {
    try {
      setLoading(true);
      if (!classroom) {
        throw new Error("No classroom found");
      }
      const currentTasks = classroom?.tasks || [];

      const newTask: Task = {
        id: getRandomId().slice(0, 8),
        label: taskLabel,
        class_id: classroom?.id,
      };

      const newTasks = [...currentTasks, newTask];

      const newClassroom = {
        ...classroom,
        tasks: newTasks,
      };

      await updateClassroom(newClassroom);
      setClassroom({ ...newClassroom });
      closeTaskModal();

      toast({
        title: "Task added",
        description: "Task added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const closeTaskModal = () => {
    onClose();
    setTaskLabel("");
  };

  return (
    <div>
      <p> Hey {user?.name}</p>
      <p> Your classroom {classroom?.name}</p>
      <p> Your classroom id {classroom?.simple_id}</p>
      <p>Your classes tasks</p>
      {classroom?.tasks?.map((task) => (
        <div key={task.id}>
          <p>{task.label}</p>
        </div>
      ))}
      <Button onClick={onOpen}>Add Task</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Task description"
              value={taskLabel}
              onChange={(e) => setTaskLabel(e.target.value)}
            ></Input>
            <div className="flex justify-between w-full mt-4">
              <Button>Cancel</Button>
              <Button colorScheme="green" onClick={addTask} isLoading={loading}>
                Add
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ClassPages;

ClassPages.getLayout = function getLayout(page: ReactElement) {
  return <Layout noNav>{page}</Layout>;
};
