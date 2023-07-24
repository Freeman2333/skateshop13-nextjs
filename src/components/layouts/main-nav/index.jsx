import Link from "next/link";
import { AppBar, Toolbar, Typography, Grid, Box, Stack } from "@mui/material";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site.consts";
import NavItem from "./nav-item";
import Searchbar from "@/components/searchbar";
import { logoTypographyStyles, linkStyles } from "./styles";

const MainNav = ({ items }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" style={linkStyles}>
          <Typography
            variant="h6"
            component={Stack}
            direction="horizontal"
            sx={logoTypographyStyles}
          >
            <Icons.logo />
            <span>{siteConfig.name}</span>
          </Typography>
        </Link>
        <Grid container spacing={3}>
          {items.map((category) => (
            <Grid item key={category.title}>
              <NavItem category={category} />
            </Grid>
          ))}
        </Grid>
        <Searchbar />
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
