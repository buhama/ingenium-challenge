import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import { useUserStore } from "../store/UserStore";

const OnboardingPage = () => {
  const { user } = useUserStore();
  return <div>Hello {user?.name}</div>;
};

export default OnboardingPage;

OnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noNav>{page}</Layout>;
};
