import { supabase } from "../../supabaseClient";
import { User, UserRole } from "../models/User";
import { getTodaysDate } from "./date";
import { User as SupabaseUser } from "@supabase/supabase-js";

export const signUp = async (
  email: string,
  password: string,
  name: string,
  role: UserRole,
  class_id: string
): Promise<SupabaseUser> => {
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
    role,
    class_id,
  };

  const { error: insertError } = await supabase.from("users").insert(newUser);

  if (insertError) {
    throw new Error(insertError.message);
  }

  return data.user;
};

export const signIn = async (
  email: string,
  password: string
): Promise<SupabaseUser | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

