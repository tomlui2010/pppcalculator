import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App.js";
import { themeLight, themeDark } from "./constants.js";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Footer from "./components/Footer.js";
import BackgroundAnimation, {
  varColor2x,
} from "./components/BackgroundAnimation.js";
import AppBarComponent from "./components/AppBar.js";

const Root = () => {
  // Manage the theme state
  const [light, setLight] = useState(true);

  // Choose the theme based on the light state
  const theme = useMemo(() => (light ? themeLight : themeDark), [light]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBarComponent light={light} />
      <App />
      <Footer light={light} setLight={setLight} />
      {light ? <BackgroundAnimation variant={varColor2x} /> : ""}
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
