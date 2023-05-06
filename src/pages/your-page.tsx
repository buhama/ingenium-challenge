import React, { ReactElement } from "react";
import Layout from "../components/Layout";

const YourPage = () => {
  return <div>YourPage</div>;
};

export default YourPage;

YourPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noNav>{page}</Layout>;
};
