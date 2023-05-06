import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../../styles/Home.module.css";
import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })}

  return (
    <>
    <form onSubmit={submit}>
    <Input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <Input type="password" placeholder="password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
      <Button colorScheme="blue" type="submit">Sign Up</Button>
      </form>
    </>
  );
}
