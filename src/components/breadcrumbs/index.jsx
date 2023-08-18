import * as React from "react";
import NextLink from "../next-link";
import { linkStyles } from "./styles";
import { Box, Typography, Breadcrumbs } from "@mui/material";

export default function DynamicBreadcrumbs({ breadcrumbItems }) {
  return (
    <Box marginBottom={3}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbItems.map((item, index) => (
          <NextLink key={index} href={item.href}>
            <Typography sx={linkStyles}>{item.title}</Typography>
          </NextLink>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
