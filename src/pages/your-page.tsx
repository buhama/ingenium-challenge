import React, { ReactElement, useState } from "react";
import Layout from "../components/Layout";
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
import { User, UserTask } from "../models/User";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import LoginBackSplash from "../components/LoginBackSplash";
import Image from "next/image";
import beaver1 from "@images/beaver1.svg";
import { faShower } from "@fortawesome/free-solid-svg-icons";
import Icon from "../components/assets/Icon";
import { IconType } from "../models/Icon";
import TaskIcons from "../components/assets/TaskIcons";

const YourPage = () => {
  const { user, updateUser, setUser } = useUserStore();
  const { classroom } = useClassroomStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [goal, setGoal] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const addTaskToUser = async () => {
    try {
      setLoading(true);
      if (!user) {
        throw new Error("No user found");
      }

      if (!classroom) {
        throw new Error("No classroom found");
      }

      if (!selectedTaskId) {
        throw new Error("No task selected");
      }

      const currentTasks = user?.tasks || [];

      if (currentTasks.find((task) => task.taskId === selectedTaskId)) {
        throw new Error("Task already added");
      }

      const newTask: UserTask = {
        taskId: selectedTaskId,
        goal: goal,
        amount: 0,
      };

      const newTasks = [...currentTasks, newTask];

      const newUser = {
        ...user,
        tasks: newTasks,
      };

      await updateUser(newUser);
      setUser({ ...newUser });

      toast({
        title: "Task added",
        description: "Task added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      closeModal();
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
    console.log("add task to user");
  };

  const closeModal = () => {
    setSelectedTaskId(null);
    setGoal(0);
    onClose();
  };

  const increaseTask = async (taskId: string) => {
    try {
      if (!user) {
        throw new Error("No user found");
      }

      const currentTasks = user?.tasks || [];
      const newTasks = currentTasks.map((task) => {
        if (task.taskId === taskId) {
          return {
            ...task,
            amount: task.amount + 1,
          };
        }
        return task;
      });

      const newUser: User = {
        ...user,
        tasks: newTasks,
      };

      await updateUser(newUser);
      setUser({ ...newUser });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Image
        className="absolute bottom-40 left-40"
        src={beaver1}
        alt="Borris The Beaver"
      />
      <div className="flex justify-end">
        <div className="w-full max-w-4xl rounded-xl bg-white mr-10 mt-20 p-4">
          <p className="font-bold text-lg">Hey {user?.name}</p>
          <div className="grid grid-cols-4 gap-4 w-full mt-10">
            {user?.tasks?.map((task) => (
              <div
                className="flex w-full items-center justify-center"
                key={task.taskId}
              >
                <TaskIcons
                  icon={IconType.SHOWER}
                  label={
                    classroom?.tasks?.find((t) => t.id === task.taskId)
                      ?.label || ""
                  }
                  bgColor={"bg-white"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <p> Hey {user?.name}</p>
      <p> Your classroom {classroom?.name}</p>
      <p> Your classroom id {classroom?.simple_id}</p>
      <p className="font-bold">Your classes tasks</p>
      {classroom?.tasks?.map((task) => (
        <div key={task.id} className="flex items-center gap-x-2">
          <p>{task.label}</p>
          <Button
            size="small"
            onClick={() => {
              setSelectedTaskId(task.id);
              onOpen();
            }}
          >
            Add To Your Tasks
          </Button>
        </div>
      ))}
      <p className="font-bold">Your own tasks</p>
      {user?.tasks?.map((task) => (
        <div key={task.taskId} className="flex items-center gap-x-2">
          <p>{classroom?.tasks?.find((t) => t.id === task.taskId)?.label}</p>
          <p>{task.amount}</p>
          <p>{task.goal}</p>
          <AddIcon
            className="cursor-pointer"
            onClick={() => increaseTask(task.taskId)}
          />
        </div>
      ))}
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="font-bold">What is your weekly goal?</p>
            <Input
              title="What is your weekly goal"
              placeholder="What is your goal"
              value={goal}
              type="number"
              onChange={(e) => setGoal(parseInt(e.target.value))}
            ></Input>
            <div className="flex justify-between w-full mt-4">
              <Button>Cancel</Button>
              <Button
                colorScheme="green"
                onClick={addTaskToUser}
                isLoading={loading}
              >
                Add
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default YourPage;

YourPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noNav>{page}</Layout>;
};
