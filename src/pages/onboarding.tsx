import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import { useUserStore } from "../store/UserStore";
import { useClassroomStore } from "../store/ClassroomStore";

const OnboardingPage = () => {
  const { user } = useUserStore();
  const { classroom } = useClassroomStore();
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
