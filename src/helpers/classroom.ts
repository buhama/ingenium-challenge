import { supabase } from "../../supabaseClient";
import { Classroom } from "../models/Classroom";
import { User } from "../models/User";

export const findClassroom = async (simple_id: string): Promise<Classroom> => {
  try {
    const { data, error } = await supabase
      .from("classrooms")
      .select("*")
      .eq("simple_id", simple_id)
      .single();

    if (error) throw new Error(error.message);

    if (!data) throw new Error("Classroom not found");

    return data as Classroom;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) throw new Error(error.message);

    if (!data) throw new Error("Users not found");

    return data as User[];
  } catch (error) {
    throw error;
  }
};
