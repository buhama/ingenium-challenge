import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Tooltip } from "@chakra-ui/react";
import { IconType, Icons } from "../../models/Icon";

interface Props {
  icon: IconType;
  className?: string;
  size?: SizeProp;
  spin?: boolean;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  tooltip?: string;
}

const Icon: React.FC<Props> = ({
  icon,
  size,
  className,
  spin,
  onClick,
  tooltip,
}) => {
  return (
    <Tooltip label={tooltip} aria-label={tooltip}>
      <FontAwesomeIcon
        icon={Icons[icon]}
        size={size}
        className={`${spin && "animate-spin"} ${className}`}
        onClick={(e) => onClick && onClick(e)}
      ></FontAwesomeIcon>
    </Tooltip>
  );
};

export default Icon;
