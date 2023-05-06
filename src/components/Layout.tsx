import { Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useRouter } from "next/router";

export interface Props {
  children: React.ReactNode;
  noNav?: boolean;
}

const Layout: React.FC<Props> = ({ children, noNav }) => {
  const [logoutLoading, setLogoutLoading] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const logOut = async () => {
    try {
      setLogoutLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Success",
        description: "You're logged out!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/login");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: (error as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="relative">
      <main className={"min-h-screen bg-hero-pattern"}>
        <div className="flex justify-end mr-4 mt-4">
          <Button
            colorScheme="red"
            size={"sm"}
            onClick={logOut}
            isLoading={logoutLoading}
          >
            Logout
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
