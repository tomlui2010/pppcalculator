import React from "react";
import CountrySelect from "./CountrySelect";
import { countries } from "./CountryData";

const SourceCountrySelect = ({ control, name }) => {
  return (
    <CountrySelect
      control={control}
      name={name}
      label="Choose Source Country"
      countries={countries}
    />
  );
};

export default SourceCountrySelect;
