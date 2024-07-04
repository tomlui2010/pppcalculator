import React, { useState } from "react";
import { Paper, Button, TextField, Box, Grid, Container } from "@mui/material";
import SourceCountrySelect from "./SourceCountrySelect.js";
import TargetCountrySelect from "./TargetCountrySelect.js";
import "../css/App.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import CalculateIcon from "@mui/icons-material/Calculate";
import APIService from "../ApiService.js";

export default function Calculate() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => {
    const getCountryISO3 = require("country-iso-2-to-3");
    console.log("Calculate button event");
    let body = {
      srcCountry: getCountryISO3(data["Source"]["code"]),
      targetCountry: getCountryISO3(data["Target"]["code"]),
      income: data["income"],
    };
    const response = APIService.CalculatePPP(body)
      .then((response) => {
        if (response.data === undefined && response.data === null) {
          setResult(null);
          throw new Error(
            "Could not find an appropriate response for this combination"
          );
        }
        navigate("/result", {
          state: {
            income: data["income"],
            source: data["Source"]["label"],
            target: data["Target"]["label"],
            result: response.data,
          },
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
        setResult(null);
      });
  };
  return (
    <Paper
      sx={{
        background: "transparent",
        margin: "auto",
        mt: 7,
        borderRadius: 20,
        boxShadow: 10,
      }}
    >
      <Container>
        <Box
          noValidate
          autoComplete="off"
          style={{
            display: "flex",
            flexDirection: "column",
            background: "transparent",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} sx={{ margin: "auto", mt: 5 }}>
                <SourceCountrySelect
                  control={control}
                  name={"Source"}
                  id="Source"
                  error={!!errors.Source}
                  helperText={errors.Source?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6} sx={{ margin: "auto", mt: 5 }}>
                <TargetCountrySelect
                  control={control}
                  name={"Target"}
                  id="Target"
                  error={!!errors.Target}
                  helperText={errors.Target?.message}
                />
              </Grid>
              <TextField
                variant="filled"
                label="Income in local currency. (Enter number only. Decimals are optional)"
                fullWidth
                required
                color="secondary"
                sx={{ mt: 4, mb: 2, mx: 2 }}
                error={!!errors.income}
                helperText={errors.income?.message}
                id="income"
                {...register("income", {
                  required: "Income is required.",
                  validate: (value) =>
                    !isNaN(value) || "Income must be a number",
                })}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ mt: 4, mb: 4 }}
              startIcon={<CalculateIcon />}
            >
              Calculate
            </Button>

            <DevTool control={control} />
          </form>
        </Box>
      </Container>
    </Paper>
  );
}
