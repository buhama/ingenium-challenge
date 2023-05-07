import {
  IconDefinition,
  faSun,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBatteryEmpty,
  faBicycle,
  faBus,
  faCarrot,
  faCoffee,
  faHamburger,
  faLeaf,
  faList,
  faPlug,
  faPlus,
  faPowerOff,
  faRecycle,
  faSeedling,
  faShoppingBag,
  faShower,
  faSpinner,
  faTint,
  faTintSlash,
  faTractor,
  faTree,
  faTshirt,
} from "@fortawesome/free-solid-svg-icons";

export enum IconType {
  BIKE = "bike",
  CARROT = "carrot",

  LOADING = "loading",

  PLUS = "plus",

  RECYCLE = "recycle",

  SHOWER = "shower",

  BATTERY = "battery",
  BUS = "bus",
  COFFEE = "coffee",
  HAMBURGER = "hamburger",
  LEAF = "leaf",
  LIST = "list",
  PLUG = "plug",
  POWER_OFF = "power-off",
  SEEDLING = "seedling",
  SHOPPING_BAG = "shopping-bag",
  SUN = "sun",
  TINT = "tint",
  TINT_SLASH = "tint-slash",
  TRASH = "trash",
  TREE = "tree",
  TRACTOR = "tractor",
  T_SHIRT = "t-shirt",
}

export const Icons: {
  [id in IconType]: IconDefinition;
} = {
  [IconType.LOADING]: faSpinner,
  [IconType.PLUS]: faPlus,
  [IconType.RECYCLE]: faRecycle,
  [IconType.SHOWER]: faShower,
  [IconType.BIKE]: faBicycle,
  [IconType.CARROT]: faCarrot,
  [IconType.BATTERY]: faBatteryEmpty,
  [IconType.BUS]: faBus,
  [IconType.COFFEE]: faCoffee,
  [IconType.HAMBURGER]: faHamburger,
  [IconType.LEAF]: faLeaf,
  [IconType.LIST]: faList,
  [IconType.PLUG]: faPlug,
  [IconType.POWER_OFF]: faPowerOff,
  [IconType.SEEDLING]: faSeedling,
  [IconType.SHOPPING_BAG]: faShoppingBag,
  [IconType.SUN]: faSun,
  [IconType.TINT]: faTint,
  [IconType.TINT_SLASH]: faTintSlash,
  [IconType.TRASH]: faTrashAlt,
  [IconType.TREE]: faTree,
  [IconType.TRACTOR]: faTractor,
  [IconType.T_SHIRT]: faTshirt,
};
