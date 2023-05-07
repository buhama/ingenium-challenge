import React from "react";
import Image from "next/image";
import profilePic from "@images/backgroundImage.svg";

const LoginBackSplash = () => {
  return (
    <div className="h-screen w-screen overflow-hidden fixed -z-10">
      <Image
        src={profilePic}
        fill
        style={{ objectFit: "cover" }}
        alt="Background forest image"
      />
    </div>
  );
};

export default LoginBackSplash;
