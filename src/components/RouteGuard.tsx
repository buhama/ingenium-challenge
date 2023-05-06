import React from "react";
import useGetAuthUser from "../hooks/getAuthUser";

interface Props {
  children: React.ReactNode;
}

const RouteGuard: React.FC<Props> = ({ children }) => {
  const { loading } = useGetAuthUser();

  return loading ? <div>Loading</div> : <>{children}</>;
};

export default RouteGuard;
