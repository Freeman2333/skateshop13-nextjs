import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";

const FormAutocomplete = ({ name, control, label, options }) => {
  const getOptionLabel = (option) =>
    options.find((opt) => opt.value === option)?.label || "";

  const renderInput = (params, error) => (
    <TextField
      {...params}
      label={label}
      fullWidth
      error={!!error}
      helperText={error?.message}
    />
  );

  const renderOption = (liProps, option) => (
    <li {...liProps} key={option.value}>
      {option.label}
    </li>
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options[0].value}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(_, val) => field.onChange(val.value)}
          options={options}
          isOptionEqualToValue={(option, value) => {
            return option.value === value;
          }}
          renderInput={(params) => renderInput(params, error)}
          renderOption={(liProps, option) => renderOption(liProps, option)}
          getOptionLabel={(option) => getOptionLabel(option)}
        />
      )}
    />
  );
};

export default FormAutocomplete;
