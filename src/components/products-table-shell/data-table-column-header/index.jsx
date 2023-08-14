import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ArrowDownward as KeyboardArrowDownIcon,
  ArrowUpward as KeyboardArrowUpIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

export function DataTableColumnHeader({ column, title }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortAscending = () => {
    column.toggleSorting(false);
    handleMenuClose();
    console.log(column.getIsSorted());
  };

  const handleSortDescending = () => {
    column.toggleSorting(true);
    handleMenuClose();
    console.log(column.getIsSorted());
  };

  const handleHideColumn = () => {
    column.toggleVisibility(false);
    handleMenuClose();
  };

  return (
    <>
      <Button
        aria-controls="column-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        endIcon={
          column.getIsSorted() === "desc" ? (
            <KeyboardArrowDownIcon aria-hidden="true" />
          ) : (
            <KeyboardArrowUpIcon aria-hidden="true" />
          )
        }
      >
        {title}
      </Button>
      <Menu
        id="column-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSortAscending}>
          <ListItemIcon>
            <KeyboardArrowUpIcon />
          </ListItemIcon>
          <ListItemText primary="Asc" />
        </MenuItem>
        <MenuItem onClick={handleSortDescending}>
          <ListItemIcon>
            <KeyboardArrowDownIcon />
          </ListItemIcon>
          <ListItemText primary="Desc" />
        </MenuItem>
        <MenuItem onClick={handleHideColumn}>
          <ListItemIcon>
            <VisibilityOffIcon />
          </ListItemIcon>
          <ListItemText primary="Hide Column" />
        </MenuItem>
      </Menu>
    </>
  );
}
