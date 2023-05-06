import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { useAuthUserStore } from "../store/AuthUserStore";

const useGetAuthUser = () => {
  const [loading, setLoading] = useState(true);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const { setUser } = useAuthUserStore();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      await supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          console.log();
          setUser(session?.user);
          setSupabaseUser(session?.user);
        }
      });

      setLoading(false);
    };

    console.log("user", supabaseUser);

    if (!supabaseUser) void getUser();
  }, []);

  return { loading };
};

export default useGetAuthUser;
