import React from "react";
import CountrySelect from "./CountrySelect";
import { countries } from "./CountryData";

const TargetCountrySelect = ({ control, name }) => {
  return (
    <CountrySelect
      control={control}
      name={name}
      label="Choose Target Country"
      countries={countries}
    />
  );
};

export default TargetCountrySelect;
