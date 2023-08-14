import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const FormInput = ({
  name,
  control,
  label,
  defaultValue = "",
  type,
  rows,
  multiline,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          rows={rows}
          multiline={multiline}
          variant="outlined"
          fullWidth
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default FormInput;
