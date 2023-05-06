import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import { useUserStore } from "../store/UserStore";
import { useClassroomStore } from "../store/ClassroomStore";
import { Button } from "@chakra-ui/react";
import { UserTask } from "../models/User";

const YourPage = () => {
  const { user, updateUser, setUser } = useUserStore();
  const { classroom } = useClassroomStore();

  const addTaskToUser = async (taskId: string) => {
    try {
      if (!user) {
        throw new Error("No user found");
      }

      if (!classroom) {
        throw new Error("No classroom found");
      }

      const currentTasks = user?.tasks || [];

      const newTask: UserTask = {
        taskId: taskId,
        goal: 10,
        amount: 0,
      };

      const newTasks = [...currentTasks, newTask];

      const newUser = {
        ...user,
        tasks: newTasks,
      };

      await updateUser(newUser);
      setUser({ ...newUser });
    } catch (error) {
      console.log(error);
    }
    console.log("add task to user");
  };

  return (
    <div>
      <p> Hey {user?.name}</p>
      <p> Your classroom {classroom?.name}</p>
      <p> Your classroom id {classroom?.simple_id}</p>
      <p className="font-bold">Your classes tasks</p>
      {classroom?.tasks?.map((task) => (
        <div key={task.id} className="flex items-center gap-x-2">
          <p>{task.label}</p>
          <Button size="small" onClick={() => addTaskToUser(task.id)}>
            Add To Your Tasks
          </Button>
        </div>
      ))}
      <p className="font-bold">Your own tasks</p>
      {user?.tasks?.map((task) => (
        <div key={task.taskId} className="flex items-center gap-x-2">
          <p>{task.taskId}</p>
          <p>{task.amount}</p>
          <p>{task.goal}</p>
        </div>
      ))}
    </div>
  );
};

export default YourPage;

YourPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noNav>{page}</Layout>;
};
