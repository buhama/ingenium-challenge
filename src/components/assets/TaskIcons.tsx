import React from "react";
import { IconType } from "../../models/Icon";
import Icon from "./Icon";
import { Tooltip } from "@chakra-ui/react";

interface Props {
  icon: IconType;
  label: string;
  bgColor: string;
  goal: number;
  progress: number;
  loading?: boolean;
}

const TaskIcons: React.FC<Props> = ({
  icon,
  label,
  bgColor,
  goal,
  progress,
  loading,
}) => {
  return (
    <div className="w-20 cursor-pointer hover:scale-105 transition-all">
      {" "}
      <p className="text-center font-bold text-xs">
        {" "}
        <span className={progress < goal ? "text-red-500" : "text-green-500"}>
          {progress}
        </span>{" "}
        / {goal}
      </p>
      <div
        className={`${bgColor} rounded-xl border-4 border-black w-20 aspect-square flex items-center justify-center `}
      >
        {!loading && <Icon icon={icon} className="text-4xl" tooltip={label} />}
        {loading && (
          <Icon
            icon={IconType.LOADING}
            className="text-4xl animate-spin"
            tooltip={label}
          />
        )}
      </div>
      <p className="text-sm text-center p-2">{label}</p>
    </div>
  );
};

export default TaskIcons;
