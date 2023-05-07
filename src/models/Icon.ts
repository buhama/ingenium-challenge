import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faShower, faSpinner } from "@fortawesome/free-solid-svg-icons";

export enum IconType {
  LOADING = "loading",

  PLUS = "plus",
  SHOWER = "shower",
}

export const Icons: {
  [id in IconType]: IconDefinition;
} = {
  [IconType.LOADING]: faSpinner,
  [IconType.PLUS]: faPlus,
  [IconType.SHOWER]: faShower,
};
