import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { supabase } from "../../supabaseClient";
import { Classroom } from "../models/Classroom";

interface ClassroomState {
  classroom: Classroom | undefined;
  setClassroom: (classroom: Classroom | undefined) => void;
  updateClassroom: (classroom: Classroom) => Promise<void>;
}

export const useClassroomStore = create<ClassroomState>()(
  devtools((set, get) => ({
    classroom: undefined,
    setClassroom: (classroom: Classroom | undefined) =>
      set(() => ({ classroom })),
    updateClassroom: async (classroom: Classroom): Promise<void> => {
      const { error } = await supabase.from("classrooms").upsert(classroom);

      if (error) {
        throw new Error(error.message);
      }
    },
  }))
);
