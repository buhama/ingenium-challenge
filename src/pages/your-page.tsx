/* eslint-disable react/no-unescaped-entities */
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
import Image from "next/image";
import beaver1 from "@images/beaver1.svg";
import borrisProfile from "@images/borrisProfile.svg";
import Icon from "../components/assets/Icon";
import { IconType } from "../models/Icon";
import TaskIcons from "../components/assets/TaskIcons";
import { AnimatePresence } from "framer-motion";
import FadeInOut from "../components/assets/FadeInOut";

const YourPage = () => {
  const { user, updateUser, setUser } = useUserStore();
  const { classroom } = useClassroomStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [goal, setGoal] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [increaseTaskLoading, setIncreaseTaskLoading] = useState(false);

  const [tasksView, setTasksView] = useState<"user" | "classroom">("user");

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
      setSelectedTaskId(taskId);
      setIncreaseTaskLoading(true);
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
    } finally {
      setIncreaseTaskLoading(false);
      setSelectedTaskId(null);
    }
  };

  return (
    <div>
      <Image
        className="absolute bottom-40 xl:left-40 hidden xl:block"
        src={beaver1}
        alt="Borris The Beaver"
      />
      <div className="w-full max-w-5xl absolute bottom-20 xl:left-60 px-10">
        <div className="flex items-start">
          <div className="rounded-full aspect-square border-2 border-black z-20">
            <Image
              src={borrisProfile}
              alt="Borris The Beaver"
              style={{ objectFit: "cover" }}
              className="bg-slate-200 rounded-full w-40"
            />
          </div>
          <div>
            <div className="bg-slate-200 w-fit min-h-fit flex items-center z-30 rounded-lg border-2 border-black -mb-1 -ml-4 px-3">
              <p className="font-bold text-lg">Borris</p>
            </div>
            <div className="bg-slate-200 w-full min-h-fit flex items-center z-10 pl-10 -ml-7 rounded-xl border-2 border-black py-2">
              <p className="font-bold text-lg">
                Keep up with your positive climate habits and my home will
                continue to flourish. You can add more habits to track based on
                what your other classmates are working on!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="w-full max-w-4xl rounded-xl bg-white mr-10 mt-20 p-4">
          <p className="font-bold text-lg">Hey {user?.name}</p>
          <AnimatePresence initial={false}>
            {tasksView === "user" && (
              <FadeInOut>
                {user?.tasks?.length === 0 ||
                  (!user?.tasks && (
                    <p className="text-center mt-5 italic -mb-5">
                      You are not tracking any habits right now. Click below to
                      start tracking!
                    </p>
                  ))}
                <div className="grid grid-cols-4 gap-4 w-full mt-10">
                  {user?.tasks?.map((task) => (
                    <div
                      className="flex w-full items-start justify-center"
                      key={task.taskId}
                      onClick={() =>
                        !increaseTaskLoading && increaseTask(task.taskId)
                      }
                    >
                      <TaskIcons
                        icon={
                          (classroom?.tasks?.find((t) => t.id === task.taskId)
                            ?.icon as IconType) || IconType.SHOWER
                        }
                        label={
                          classroom?.tasks?.find((t) => t.id === task.taskId)
                            ?.label || ""
                        }
                        bgColor={"bg-white"}
                        goal={task.goal}
                        progress={task.amount}
                        loading={
                          increaseTaskLoading && selectedTaskId === task.taskId
                        }
                      />
                    </div>
                  ))}
                </div>
              </FadeInOut>
            )}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {tasksView === "classroom" && (
              <FadeInOut>
                <div>
                  <p className="font-bold">Your Classroom Tasks: </p>
                  <div className="grid grid-cols-4 gap-4 w-full mt-10">
                    {classroom?.tasks?.map((task) => (
                      <div
                        className="flex w-full items-start justify-center"
                        key={task.id}
                        onClick={() => {
                          setSelectedTaskId(task.id);
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
                </div>
              </FadeInOut>
            )}
          </AnimatePresence>
          <Button
            className="w-full mt-4"
            colorScheme="green"
            leftIcon={<Icon icon={IconType.PLUS} />}
            onClick={() =>
              setTasksView(tasksView === "user" ? "classroom" : "user")
            }
          >
            {tasksView === "user"
              ? "Add Other Habits That Your Classmates Are Working On"
              : "Track Your Own Habits"}
          </Button>
        </div>
      </div>

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
