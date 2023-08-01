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
import Searchbar from "@/components/searchbar";
import {
  logoTypographyStyles,
  linkStyles,
  toolbarStyles,
  signInButtonStyles,
} from "./styles";
import NextLink from "@/components/next-link";
import { getCategories } from "@/services/categories";
import Cart from "@/components/cart-sidebar";

const MainNav = async () => {
  const categories = await getCategories();

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
            <Grid item key="all products">
              <NextLink href={`/products`}>
                <Typography variant="h6" textTransform={"capitalize"}>
                  All
                </Typography>
              </NextLink>
            </Grid>
            {categories.map((category) => (
              <Grid item key={category.id}>
                <NextLink href={`/categories/${category.name}`}>
                  <Typography variant="h6" textTransform={"capitalize"}>
                    {category.name}
                  </Typography>
                </NextLink>
              </Grid>
            ))}
          </Grid>
          <Searchbar />
          <Cart />
          <Button color="inherit" variant="outlined" sx={signInButtonStyles}>
            <NextLink href="/signin">Sign In</NextLink>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNav;
