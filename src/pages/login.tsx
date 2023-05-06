import React, { ReactElement, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Input, useToast, Button } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
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

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-y-2 w-full mx-auto max-w-xs justify-center h-screen"
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
      <Button type="submit" isLoading={loading}>
        Log In
      </Button>
    </form>
  );
};

export default LoginPage;
