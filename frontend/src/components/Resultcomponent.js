import React, { useTheme } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { income, source, target, result } = state;

  console.log("From Result component", state, income, source, target, result);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Box
        mt={10}
        p={6}
        maxWidth="900px"
        mx="auto"
        borderRadius={2}
        boxShadow={3}
        background="transparent"
      >
        {result !== null && result !== undefined ? (
          <>
            <Typography variant="subtitle1" gutterBottom align={"center"}>
              PPP Salary Calculation
            </Typography>
            <Typography variant="body1">
              You require a salary of {result} in {target} to live a similar
              quality of life as you would live with a salary of {income} in{" "}
              {source}
            </Typography>
          </>
        ) : (
          <Typography variant="subtitle1" color="error">
            Failed to calculate the PPP value. Please check your inputs or try
            again later.
          </Typography>
        )}
        <Box mt={2} align={"center"}>
          <Button
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGoBack}
          >
            Go Back to Home
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Result;
