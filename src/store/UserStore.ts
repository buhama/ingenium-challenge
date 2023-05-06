import create from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "../models/User";
import { supabase } from "../../supabaseClient";

interface UserState {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  updateUser: (user: User) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    user: undefined,
    setUser: (user: User | undefined) => set(() => ({ user })),
    updateUser: async (user: User): Promise<void> => {
      const { error } = await supabase.from("users").upsert(user);

      if (error) {
        throw new Error(error.message);
      }
    },
  }))
);
