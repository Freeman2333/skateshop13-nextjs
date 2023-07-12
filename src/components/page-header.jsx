import React from "react";
import { Typography, Box } from "@mui/material";

const PageHeader = ({ title, description }) => {
  return (
    <Box marginBottom={4}>
      <Typography
        variant="h4"
        component="h4"
        fontWeight={600}
        textTransform={"capitalize"}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" component="p" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default PageHeader;
