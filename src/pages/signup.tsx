import React, { useState } from "react";
import { Input, useToast, Button, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthUserStore } from "../store/AuthUserStore";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUpUser } = useAuthUserStore();

  const toast = useToast();
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signUpUser(email, password, name);
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

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-y-2 w-full mx-auto max-w-xs justify-center h-screen"
    >
      <h2 className="font-bold text-xl">Sign up</h2>
      <Input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="email"
        className="w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button colorScheme="green" type="submit" isLoading={loading}>
        Sign Up
      </Button>
      <Divider />
      <p className="mt-3">Already have an account?</p>
      <Button onClick={() => router.push("/login")}>Login</Button>
    </form>
  );
};

export default SignUp;
