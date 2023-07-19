import Link from "next/link";
import { AppBar, Toolbar, Typography, Grid, Stack } from "@mui/material";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site.consts";
import NavItem from "./nav-item";
import Searchbar from "@/components/searchbar";

import Cart from "@/components/cart-sidebar";

const MainNav = ({ items }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            component={Stack}
            direction="row"
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
        <Grid container spacing={3}>
          {items.map((category) => (
            <Grid item key={category.title}>
              <NavItem category={category} />
            </Grid>
          ))}
        </Grid>
        <Searchbar />
        <Cart />
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
