import create from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@supabase/supabase-js";
import { signIn, signOut, signUp } from "../helpers/auth";

//TODO: Create User object

interface AuthUserState {
  user: User | undefined;
  setUser: (user: User) => void;
  loginUser: (email: string, password: string) => Promise<void>;
  signUpUser: (email: string, password: string, name: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export const useAuthUserStore = create<AuthUserState>()(
  devtools((set) => ({
    user: undefined,
    setUser: (user) => set((state) => ({ user })),
    loginUser: async (email: string, password: string) => {
      try {
        const loggingInUser = await signIn(email, password);
        if (loggingInUser) set(() => ({ user: loggingInUser }));
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
    signUpUser: async (email: string, password: string, name: string) => {
      try {
        const newUser = await signUp(email, password, name);
        if (newUser) set(() => ({ user: newUser }));
      } catch (error) {
        console.error(error);
        throw new Error((error as Error).message);
      }
    },
    logoutUser: async () => {
      try {
        await signOut();
        set(() => ({ user: undefined }));
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },
  }))
);
