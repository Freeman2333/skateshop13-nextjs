import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Stack,
  Button,
  Container,
} from "@mui/material";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site.consts";
import NavItem from "./nav-item";
import Searchbar from "@/components/searchbar";
import { logoTypographyStyles, linkStyles, toolbarStyles } from "./styles";
import NextLink from "@/components/next-link";
import Cart from "@/components/cart-sidebar";

const MainNav = ({ items }) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={toolbarStyles}>
          <Link href="/" style={linkStyles}>
            <Typography
              variant="h6"
              component={Stack}
              direction="row"
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
          <Cart />
          <Button
            color="inherit"
            variant="outlined"
            sx={{
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            <NextLink href="/signin">Sign In</NextLink>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNav;
