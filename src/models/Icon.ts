import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faShower, faSpinner } from "@fortawesome/free-solid-svg-icons";

export enum IconType {
  LOADING = "loading",

  SHOWER = "shower",
}

export const Icons: {
  [id in IconType]: IconDefinition;
} = {
  [IconType.LOADING]: faSpinner,
  [IconType.SHOWER]: faShower,
};
