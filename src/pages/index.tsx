import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../../styles/Home.module.css";
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);

  return <>you shouldnt be here</>;
}
