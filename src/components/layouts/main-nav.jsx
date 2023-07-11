"use client";
import React, { useState } from "react";
import Link from "next/link";

import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  Toolbar,
  AppBar,
  Stack,
} from "@mui/material";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

const MainNav = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Typography
              variant="h6"
              component={Stack}
              direction="horizontal"
              sx={{
                marginRight: 5,
                alignItems: "center",
                gap: 1,
                color: "#fff !important",
                textDecoration: "none !important",
                "& svg": {
                  display: "block",
                  width: 30,
                  height: 30,
                },
                "& span": {
                  textDecoration: "none !important",
                },
              }}
            >
              <Icons.logo />
              <span>{siteConfig.name}</span>
            </Typography>
          </Link>
          <Grid container spacing={2}>
            <Grid item>
              <Box
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <Typography variant="h6">Category 1</Typography>
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
                  disableRestoreFocus
                >
                  <List component="nav" aria-label="subcategories">
                    <ListItem>
                      <Link href="/">sdsda</Link>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Subcategory 2" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Subcategory 3" />
                    </ListItem>
                  </List>
                </Popover>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="h6">Category 2</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Category 3</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {JSON.stringify(items)}
    </div>
  );
};

export default MainNav;
