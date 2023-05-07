import React, { useState } from "react";
import { Input, useToast, Button, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthUserStore } from "../store/AuthUserStore";
import LoginBackSplash from "../components/LoginBackSplash";
import Image from "next/image";
import logo from "@images/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useAuthUserStore();

  const toast = useToast();
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginUser(email, password);
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
    <>
      {" "}
      <LoginBackSplash />
      <div className="h-screen px-4 mx-auto max-w-md w-full flex flex-col justify-center">
        <Image
          src={logo}
          alt="logo"
          width={300}
          height={100}
          className="self-center mb-10"
        />
        <div className="bg-white h-fit p-4 rounded-xl shadow-xl">
          <form
            onSubmit={submit}
            className="flex flex-col gap-y-2 w-full justify-center"
          >
            <h2 className="font-bold text-xl">Login</h2>
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
              Log In
            </Button>
            <Divider />
            <p className="mt-3">Dont have an account?</p>
            <Button onClick={() => router.push("/signup")}>Sign Up</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
