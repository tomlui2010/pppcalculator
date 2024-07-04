import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import PPP from "./PPPFetchLiveButton.js";
import {
  Box,
  Container,
  Typography,
  Toolbar,
  FormControlLabel,
  Switch,
} from "@mui/material";

const Footer = ({ light, setLight }) => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "4",
      }}
    >
      <Toolbar sx={{ justifyContent: "left" }}>
        <FormControlLabel
          control={
            <Switch
              inputProps={{ "aria-label": "Dark mode" }}
              checked={!light}
              onChange={() => setLight((prev) => !prev)}
            />
          }
          label="Toggle ON dark mode"
          labelPlacement="end"
          sx={{
            mx: "auto",
          }}
        />
      </Toolbar>
      <Container maxWidth="sm">
        <Typography
          sx={{
            textAlign: "center",
          }}
        >
          <p>Designed and developed by</p>
          <h4>Thomas Louis</h4>
        </Typography>
      </Container>
      <PPP />
    </Box>
  );
};

export default Footer;
