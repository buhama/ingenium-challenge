import React, { ReactElement, useEffect } from "react";
import Layout from "../components/Layout";
import { useUserStore } from "../store/UserStore";
import { useClassroomStore } from "../store/ClassroomStore";
import { UserRole } from "../models/User";
import { useRouter } from "next/router";

const OnboardingPage = () => {
  const { user } = useUserStore();
  const { classroom } = useClassroomStore();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role === UserRole.TEACHER) {
      router.push("/class-page");
    } else if (user.role === UserRole.STUDENT) {
      router.push("/your-page");
    }
  }, [router, user]);
  return (
    <div>
      Hello {user?.name} you are part of classroom {classroom?.name} and your
      classroom id is {classroom?.simple_id}
    </div>
  );
};

export default OnboardingPage;

OnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noNav>{page}</Layout>;
};
