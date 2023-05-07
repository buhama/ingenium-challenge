import React from "react";
import Image from "next/image";
import profilePic from "../../public/images/BG-habits.png";

const LoginBackSplash = () => {
  return (
    <div className="h-screen w-screen overflow-hidden fixed -z-10">
      <Image src={profilePic} fill alt="Background forest image" />
    </div>
  );
};

export default LoginBackSplash;
