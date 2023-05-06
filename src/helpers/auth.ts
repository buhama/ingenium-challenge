import { supabase } from "../../supabaseClient";
import { User } from "../models/User";
import { getTodaysDate } from "./date";

export const signUp = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        email,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.user?.id) {
    throw new Error("No user id returned");
  }

  const newUser: User = {
    id: data?.user?.id || "",
    name,
    account_created: getTodaysDate(),
  };

  const { error: insertError } = await supabase.from("users").insert(newUser);

  if (insertError) {
    throw new Error(insertError.message);
  }

  return newUser;
};
