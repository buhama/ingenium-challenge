import { useEffect } from "react";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";
import { useUserStore } from "../store/UserStore";
import { supabase } from "../../supabaseClient";
import { User } from "../models/User";

export const useGetUserData = (userId: string | undefined) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    console.log("we doing this", userId);
    /**
     * Fetch a single user
     * @param {number} userId
     */
    const fetchUser = async (userId: string) => {
      try {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId);
        const user = data ? (data[0] as User) : undefined;
        setUser(user);
        return user;
      } catch (error) {
        console.log("error", error);
      }
    };

    if (userId) {
      void fetchUser(userId);
      const organizerListener = supabase
        .channel("public:organizers")
        .on(
          REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
          {
            event: "*",
            schema: "public",
            table: "organizers",
            filter: `id=eq.${userId}`,
          },
          (payload) => {
            console.log("new user", payload.new);
            const user = payload.new as User;
            setUser(user);
          }
        )
        .subscribe();
      return () => {
        void supabase.removeChannel(organizerListener);
      };
    }
  }, [userId, setUser]);
};
