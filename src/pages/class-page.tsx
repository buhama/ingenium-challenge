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
import TaskIcons from "../components/assets/TaskIcons";
import { IconType, Icons } from "../models/Icon";
import Icon from "../components/assets/Icon";

const ClassPages = () => {
  const { user } = useUserStore();
  const { classroom, updateClassroom, setClassroom } = useClassroomStore();
  const [taskLabel, setTaskLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState<IconType>(IconType.LEAF);
  const [selectedId, setSelectedId] = useState<string>("");

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
        id: selectedId || getRandomId().slice(0, 8),
        label: taskLabel,
        class_id: classroom?.id,
        icon,
      };

      const newTasks = [...currentTasks];

      if (selectedId) {
        const index = newTasks.findIndex((task) => task.id === selectedId);
        newTasks[index] = newTask;
      } else {
        newTasks.push(newTask);
      }

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

  const deleteTask = async () => {
    try {
      setLoading(true);
      if (!classroom) {
        throw new Error("No classroom found");
      }
      const currentTasks = classroom?.tasks || [];

      const newTasks = currentTasks.filter((task) => task.id !== selectedId);

      const newClassroom = {
        ...classroom,
        tasks: newTasks,
      };

      await updateClassroom(newClassroom);
      setClassroom({ ...newClassroom });
      closeTaskModal();

      toast({
        title: "Task deleted",
        description: "Task deleted successfully",
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
    setIcon(IconType.LEAF);
    setSelectedId("");
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="w-full max-w-4xl rounded-xl bg-white mr-10 mt-20 p-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">Hey {user?.name}</p>
            <p>Class Id: {classroom?.simple_id}</p>
          </div>
          <div>
            <p className="font-bold">Your Classroom Tasks: </p>
            <div className="grid grid-cols-4 gap-4 w-full mt-10">
              {classroom?.tasks?.map((task) => (
                <div
                  className="flex w-full items-start justify-center"
                  key={task.id}
                  onClick={() => {
                    setSelectedId(task.id);
                    setIcon(task.icon as IconType);
                    setTaskLabel(task.label);
                    onOpen();
                  }}
                >
                  <TaskIcons
                    icon={(task.icon as IconType) || IconType.SHOWER}
                    label={task.label}
                    bgColor={"bg-white"}
                  />
                </div>
              ))}
            </div>
            <Button
              className="w-full mt-4"
              leftIcon={<Icon icon={IconType.PLUS} />}
              onClick={onOpen}
            >
              Add Task For The Classroom
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeTaskModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Habit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Task description</p>
            <Input
              placeholder="Eat vegan meals"
              value={taskLabel}
              onChange={(e) => setTaskLabel(e.target.value)}
            ></Input>
            <p className="mt-4">Select Icon For Habit</p>
            <div className="grid grid-cols-6 gap-4 mt-2">
              {Object.keys(Icons).map((key) => (
                <div
                  key={key}
                  className={` ${
                    key === icon && "bg-green-200"
                  } flex flex-col items-center cursor-pointer hover:bg-green-200 rounded-lg p-2 justify-center`}
                  onClick={() => setIcon(key as IconType)}
                >
                  <Icon
                    icon={key as IconType}
                    className="cursor-pointer text-xl hover:scale-105 "
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full mt-12">
              <Button onClick={closeTaskModal}>Cancel</Button>
              <div className="flex gap-x-2">
                {selectedId && (
                  <Button
                    colorScheme="red"
                    onClick={deleteTask}
                    leftIcon={<Icon icon={IconType.TRASH} />}
                  >
                    Delete Task
                  </Button>
                )}
                <Button
                  colorScheme="green"
                  onClick={addTask}
                  isLoading={loading}
                >
                  Add
                </Button>
              </div>
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
