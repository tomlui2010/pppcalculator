import { createTheme } from "@mui/material/styles";

export const themeLight = createTheme({
  typography: {
    fontFamily: '"Roboto","Times New Roman", Georgia, serif',
  },
  palette: {
    secondary: {
      main: "#800080",
    },
    background: {
      default: "#926cff",
    },
    text: {
      primary: "#EEEEEE",
    },
  },
});

export const themeDark = createTheme({
  typography: {
    fontFamily: '"Roboto","Times New Roman", Georgia, serif',
  },
  palette: {
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#333333",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
