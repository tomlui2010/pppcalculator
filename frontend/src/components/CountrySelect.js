// CountrySelect.js
import React from "react";
import { TextField, Autocomplete, Box } from "@mui/material";
import { Controller } from "react-hook-form";

const CountrySelect = ({ control, name, label, countries }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={countries}
          getOptionLabel={(option) => option.label}
          onChange={(_, data) => field.onChange(data)}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{
                "& > img": { mr: 2, flexShrink: 0 },
                backgroundColor: "white",
                color: "purple",
                "&.Mui-focused": { backgroundColor: "lightgray" },
                "&:hover": { backgroundColor: "lightgray" },
              }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              {option.label}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              fullWidth
              required
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
      )}
    />
  );
};

export default CountrySelect;
