/* eslint-disable react/no-unescaped-entities */
import React, { ReactElement, useEffect, useState } from "react";
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
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
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
import tree from "@images/tree.svg";
import { Classroom, Tree } from "../models/Classroom";
import { getRandomId } from "../helpers/string";
import {
  getTreeBottomClass,
  getTreeOpacityStyle,
  getTreeRightClass,
} from "../helpers/tree";
import { getAllUsers } from "../helpers/classroom";

const YourPage = () => {
  const { user, updateUser, setUser } = useUserStore();
  const { classroom, updateClassroom, setClassroom } = useClassroomStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [goal, setGoal] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [increaseTaskLoading, setIncreaseTaskLoading] = useState(false);

  const [tasksView, setTasksView] = useState<"user" | "classroom">("user");
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const newUsers = await getAllUsers();
        if (newUsers) {
          setAllUsers(newUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    void fetchUsers();
  }, []);

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

      const currentTrees = classroom?.trees || [];
      const newTree: Tree = {
        id: getRandomId().slice(0, 5),
        studentId: user.id,
        taskId: selectedTaskId,
        opacityClass: "0.1",
        rightClass: getTreeRightClass(),
        bottomClass: getTreeBottomClass(),
      };

      const newTrees = [...currentTrees, newTree];

      await updateUser(newUser);
      await updateClassroom({
        ...classroom,
        trees: newTrees,
      });
      setUser({ ...newUser });
      setClassroom({
        ...classroom,
        trees: newTrees,
      });

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

      if (!classroom) {
        throw new Error("No classroom found");
      }

      const currentTasks = user?.tasks || [];
      const selectedTask = currentTasks.find((task) => task.taskId === taskId);
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
      const newTrees = classroom?.trees?.map((tree) => {
        if (tree.taskId === taskId && tree.studentId === user.id) {
          return {
            ...tree,
            opacityClass: selectedTask
              ? getTreeOpacityStyle(selectedTask.goal, selectedTask.amount + 1)
              : "1",
          };
        }
        return tree;
      });

      console.log("newTrees", newTrees);

      const newClassroom: Classroom = {
        ...classroom,
        trees: newTrees,
      };

      await updateUser(newUser);
      await updateClassroom(newClassroom);
      setUser({ ...newUser });
      setClassroom({ ...newClassroom });
    } catch (error) {
      console.log(error);
    } finally {
      setIncreaseTaskLoading(false);
      setSelectedTaskId(null);
    }
  };

  return (
    <div>
      {classroom?.trees?.map((t) => (
        <Popover key={t.id}>
          <PopoverTrigger>
            <Image
              key={t.id}
              className={`absolute cursor-pointer hover:scale-105 transition-all`}
              style={{
                bottom: t.bottomClass,
                right: t.rightClass,
                opacity: t.opacityClass,
              }}
              width={100}
              src={tree}
              alt="Tree"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <div className="p-2">
                <span className="font-bold">
                  {allUsers?.find((u) => u.id === t.studentId)?.name}'s
                </span>{" "}
                Tree For Task{" "}
                <span className="font-bold">
                  {
                    classroom?.tasks?.find((task) => task.id === t.taskId)
                      ?.label
                  }
                </span>
                <p className="mt-2">Progress:</p>
                <Progress hasStripe value={parseFloat(t.opacityClass) * 100} />
              </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ))}
      {/* <Image
        className="absolute"
        style={{ bottom: "20%", right: "8%" }}
        width={100}
        src={tree}
        alt="Tree"
      />
      <Image
        className="absolute"
        style={{ bottom: "35%", right: "8%" }}
        width={150}
        src={tree}
        alt="Tree"
      />
      <Image
        className="absolute"
        style={{ bottom: "20%", right: "85%" }}
        width={200}
        src={tree}
        alt="Tree"
      />
      <Image
        className="absolute"
        style={{ bottom: "35%", right: "85%" }}
        width={250}
        src={tree}
        alt="Tree"
      /> */}
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
              <p className="font-bold md:text-lg text-sm">
                Keep up with your positive climate habits and my home will
                continue to flourish. You can add more habits to track based on
                what your other classmates are working on!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className="w-full max-w-4xl rounded-xl bg-white xl:mr-10 mx-4 mt-20 p-4 overflow-auto z-50"
          style={{ maxHeight: "60vh" }}
        >
          <p className="font-bold text-lg">Hey {user?.name}</p>
          <AnimatePresence initial={false}>
            {tasksView === "user" && (
              <FadeInOut>
                {(user?.tasks?.length === 0 || !user?.tasks) && (
                  <p className="text-center mt-5 italic -mb-5">
                    You are not tracking any habits right now. Click below to
                    start tracking!
                  </p>
                )}
                <div className="grid md:grid-cols-4 grid-cols-3 gap-4 w-full mt-10">
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
                  <p className="font-bold text-center mt-4">
                    Your Classroom Habits:{" "}
                  </p>
                  <div className="grid md:grid-cols-4 grid-cols-3 gap-4 w-full mt-10">
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
            size="sm"
            leftIcon={<Icon icon={IconType.PLUS} />}
            onClick={() =>
              setTasksView(tasksView === "user" ? "classroom" : "user")
            }
          >
            {tasksView === "user"
              ? "Add Other Habits From Your Classroom"
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
