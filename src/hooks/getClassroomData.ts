import { useEffect } from "react";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";
import { supabase } from "../../supabaseClient";
import { useClassroomStore } from "../store/ClassroomStore";
import { Classroom } from "../models/Classroom";

export const useGetClassroomData = (classroomId: string | undefined) => {
  const { setClassroom } = useClassroomStore();

  useEffect(() => {
    console.log("getting classroom", classroomId);
    /**
     * Fetch a single classroom
     * @param {number} classroomId
     */
    const fetchClassroom = async (classroomId: string) => {
      try {
        const { data } = await supabase
          .from("classrooms")
          .select("*")
          .eq("id", classroomId);
        const classroom = data ? (data[0] as Classroom) : undefined;
        setClassroom(classroom);
        return classroom;
      } catch (error) {
        console.log("error", error);
      }
    };

    if (classroomId) {
      void fetchClassroom(classroomId);
      const classroomListener = supabase
        .channel("public:classrooms")
        .on(
          REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
          {
            event: "*",
            schema: "public",
            table: "classrooms",
            filter: `id=eq.${classroomId}`,
          },
          (payload) => {
            console.log("new classroom", payload.new);
            const classroom = payload.new as Classroom;
            setClassroom(classroom);
          }
        )
        .subscribe();
      return () => {
        void supabase.removeChannel(classroomListener);
      };
    }
  }, [classroomId, setClassroom]);
};
