import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light"
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette = mode === themeModes.dark ? {
      primary: {
        main: "#ffbb00",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#f44336",
        contrastText: "#ffffff"
      },
      background: {
        default: "#080A1A",
        paper: "#0B0F29"
      }
    } : {
      primary: {
        main: "#ffbb00",
        contrastText: "#ffbb00"
      },
      secondary: {
        main: "#f44336",
        contrastText: "#ffffff"
      },
      background: {
        default: colors.grey["400"],
      }
    };

    return createTheme({
      palette: {
        mode,
        ...customPalette
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true }
        }
      }
    });
  }
};

export default themeConfigs;