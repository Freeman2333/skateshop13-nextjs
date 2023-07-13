"use client";
import React, { useState } from "react";
import { Typography, List, ListItem, Box, Popover } from "@mui/material";

import NextLink from "@/components/next-link";

const NavItem = ({ category }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <Typography
        variant="h6"
        component={NextLink}
        href={category.title}
        textTransform={"capitalize"}
      >
        {category.title}
      </Typography>
      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
      >
        <List
          component="nav"
          aria-label="subcategories"
          onMouseLeave={handlePopoverClose}
        >
          {category.items.map((subcategory) => (
            <ListItem key={subcategory.title}>
              <NextLink href={subcategory.href}>{subcategory.title}</NextLink>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
};

export default NavItem;
