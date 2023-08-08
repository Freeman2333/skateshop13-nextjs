"use client";
import * as React from "react";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Person, Dashboard, Logout } from "@mui/icons-material";
import { signOut } from "next-auth/react";

import {
  buttonBox,
  iconButtonStyles,
  avatarStyles,
  menuArrowStyles,
  headerBoxStyles,
} from "./styles";
import NextLink from "@/components/next-link";

export default function UserMenu({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={buttonBox}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={iconButtonStyles}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={avatarStyles}>
              {user.name
                ? user.name[0].toUpperCase()
                : user.email[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={menuArrowStyles}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box onClick={handleClose} sx={headerBoxStyles}>
          <Typography>{user.name}</Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            {user.email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <NextLink href="/dashboard/account">Account</NextLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Dashboard fontSize="small" />
          </ListItemIcon>
          {/* TODO: add correct route after fix PR is merged */}
          <NextLink href="/dashboard">Dashboard</NextLink>
        </MenuItem>
        <MenuItem onClick={async () => await signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
