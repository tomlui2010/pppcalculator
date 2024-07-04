import React from "react";
import Calculate from "./CalculateForm.js";
import { Container } from "@mui/material";
import PPPinfo from "./PPPinfo.js";

const Home = () => {
  return (
    <div>
      <Container maxWidth="l" sx={{ mt: 4 }}>
        <Calculate />
        <PPPinfo />
      </Container>
    </div>
  );
};

export default Home;
