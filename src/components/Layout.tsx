import { Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthUserStore } from "../store/AuthUserStore";
import { useGetUserData } from "../hooks/getUserData";
import { useGetClassroomData } from "../hooks/getClassroomData";
import { useUserStore } from "../store/UserStore";
import LoginBackSplash from "./LoginBackSplash";

export interface Props {
  children: React.ReactNode;
  noNav?: boolean;
}

const Layout: React.FC<Props> = ({ children, noNav }) => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { logoutUser } = useAuthUserStore();
  const { user: authUser } = useAuthUserStore();
  const { user } = useUserStore();

  const toast = useToast();
  const router = useRouter();
  useGetUserData(authUser?.id);
  useGetClassroomData(user?.class_id);

  const logOut = async () => {
    try {
      setLogoutLoading(true);
      await logoutUser();

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
    <div>
      <main>
        <LoginBackSplash />
        <div className="min-h-screen">
          <div>
            <div className="flex justify-end mr-4 pt-4">
              <Button
                colorScheme="red"
                size={"sm"}
                onClick={logOut}
                isLoading={logoutLoading}
              >
                Logout
              </Button>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
