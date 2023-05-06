import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const OnboardingPage = () => {
  return <div>OnboardingPage</div>;
};

export default OnboardingPage;

OnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noNav>{page}</Layout>;
};
