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
import { getServerSession } from "next-auth";

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
import authOptions from "@/lib/auth";
import UserMenu from "@/components/auth/user-menu";
import { routes } from "@/constants";

const MainNav = async () => {
  const session = await getServerSession(authOptions);
  const categories = await getCategories();

  const user = session?.user;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar sx={toolbarStyles}>
          <Link href={routes.homePage} style={linkStyles}>
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
              <NextLink href={routes.products}>
                <Typography variant="h6" textTransform={"capitalize"}>
                  All
                </Typography>
              </NextLink>
            </Grid>
            {categories.map((category) => (
              <Grid item key={category.id}>
                <NextLink href={`${routes.categories}/${category.name}`}>
                  <Typography variant="h6" textTransform={"capitalize"}>
                    {category.name}
                  </Typography>
                </NextLink>
              </Grid>
            ))}
          </Grid>
          <Searchbar />
          <Cart />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button color="inherit" variant="outlined" sx={signInButtonStyles}>
              <NextLink href={routes.signIn}>Sign In</NextLink>
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNav;
