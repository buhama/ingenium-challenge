import React, { useState } from "react";
import { Input, useToast, Button, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthUserStore } from "../store/AuthUserStore";
import { UserRole } from "../models/User";
import ToggleRadio from "../components/assets/ToggleRadio";
import { AnimatePresence } from "framer-motion";
import FadeInOut from "../components/assets/FadeInOut";
import { Classroom } from "../models/Classroom";
import { getTodaysDate } from "../helpers/date";
import { useClassroomStore } from "../store/ClassroomStore";
import { getRandomId } from "../helpers/string";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<UserRole | undefined>(undefined);
  const [classRoomName, setClassRoomName] = useState("");
  const [classroomId, setClassroomId] = useState("");
  const [classroom, setClassroom] = useState<Classroom | undefined>(undefined);

  const { signUpUser } = useAuthUserStore();
  const { updateClassroom } = useClassroomStore();

  const toast = useToast();
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!role) throw new Error("Please select a role");

      await signUpUser(email, password, name, role);
      if (role === UserRole.TEACHER) {
        await updateClassroom({
          id: getRandomId(),
          name: classRoomName,
          created_at: getTodaysDate(),
        });
      }

      router.push("/onboarding");

      toast({
        title: "Success",
        description: "You're in!!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const findClassroom = (id: string) => {
    if (id) {
      setClassroom({
        id: "",
        name: "",
        created_at: getTodaysDate(),
      });
    }
  };

  return (
    <div className="h-screen mx-auto max-w-xs w-full flex flex-col justify-center">
      <p className="font-bold">Are you a teacher or a learner?</p>
      <ToggleRadio
        options={[
          { label: "I am a learner", value: UserRole.STUDENT },
          { label: "I am a teacher", value: UserRole.TEACHER },
        ]}
        setValue={(s) => setRole(s as UserRole)}
        value={role}
        className="mb-5"
      />
      <AnimatePresence initial={false}>
        {role === UserRole.STUDENT && !classroom && (
          <FadeInOut>
            <Input
              placeholder="Enter Your Classroom ID"
              className="mb-5"
              onChange={(e) => setClassroomId(e.target.value)}
              value={classroomId}
            />
            <Button
              className="w-full"
              colorScheme={"green"}
              onClick={() => findClassroom(classroomId)}
            >
              Find
            </Button>
          </FadeInOut>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {role && (role === UserRole.TEACHER || !!classroom) && (
          <FadeInOut>
            <Divider className="mb-5" />
            <form
              onSubmit={submit}
              className="flex flex-col gap-y-2 w-full justify-center"
            >
              <h2 className="font-bold text-xl">Sign up</h2>
              {role === UserRole.TEACHER && (
                <Input
                  type="text"
                  placeholder="Classroom name"
                  value={classRoomName}
                  onChange={(e) => setClassRoomName(e.target.value)}
                />
              )}
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Your email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button colorScheme="green" type="submit" isLoading={loading}>
                Sign Up
              </Button>
              <Divider className="mt-3" />
              <p className="mt-3">Already have an account?</p>
              <Button onClick={() => router.push("/login")}>Login</Button>
            </form>
          </FadeInOut>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUp;
