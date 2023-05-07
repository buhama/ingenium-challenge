import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faShower } from "@fortawesome/free-solid-svg-icons";

export enum IconType {
  SHOWER = "shower",
}

export const Icons: {
  [id in IconType]: IconDefinition;
} = {
  [IconType.SHOWER]: faShower,
};
