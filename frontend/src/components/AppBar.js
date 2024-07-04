import React from "react";
import {
  AppBar,
  ThemeProvider,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { themeLight, themeDark } from "../constants";

const AppBarComponent = ({ light }) => {
  const theme = useTheme();
  const appliedTheme = light ? themeLight : themeDark;
  return (
    <ThemeProvider theme={appliedTheme}>
      <AppBar
        position="static"
        maxWidth="sm"
        sx={{ backgroundColor: appliedTheme.palette.background.default }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <Typography text-align="center" variant="h2">
            PPP Salary Calculator
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default AppBarComponent;
