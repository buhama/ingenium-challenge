import { Inter } from "@next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);

  return <>you shouldnt be here</>;
}
