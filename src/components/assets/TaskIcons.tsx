import React from "react";
import { IconType } from "../../models/Icon";
import Icon from "./Icon";
import { Tooltip } from "@chakra-ui/react";

interface Props {
  icon: IconType;
  label: string;
  bgColor: string;
}

const TaskIcons: React.FC<Props> = ({ icon, label, bgColor }) => {
  return (
    <div className="w-20 cursor-pointer hover:scale-105 transition-all">
      {" "}
      <div
        className={`${bgColor} rounded-xl border-4 border-black w-20 aspect-square flex items-center justify-center `}
      >
        <Icon icon={icon} className="text-4xl" tooltip={label} />
      </div>
      <p className="text-sm text-center p-2">{label}</p>
    </div>
  );
};

export default TaskIcons;