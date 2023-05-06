import { extendTheme } from "@chakra-ui/react";

const themes = {
  colors: {
    yellow: {
      50: "#fffada",
      100: "#fff0ad",
      200: "#ffe67d",
      300: "#ffdb4b",
      400: "#ffd11a",
      500: "#e6b800",
      600: "#b38f00",
      700: "#806600",
      800: "#4e3d00",
      900: "#1d1400",
    },
  },
  components: {
    Modal: {
      baseStyle: {
        dialog: {
          mx: "2",
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "green.500",
      },
    },
    Popover: {
      baseStyle: {
        popper: {
          width: "fit-content",
          maxWidth: "fit-content",
        },
      },
    },
  },
};
const theme = extendTheme(themes);

export default theme;
