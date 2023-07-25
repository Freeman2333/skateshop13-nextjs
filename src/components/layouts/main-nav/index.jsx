import Link from "next/link";
import { AppBar, Toolbar, Typography, Grid, Box, Stack } from "@mui/material";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site.consts";
import Searchbar from "@/components/searchbar";
import { logoTypographyStyles, linkStyles } from "./styles";
import NextLink from "@/components/next-link";
import { getCategories } from "@/services/categories";
import { capitalizeWord } from "@/utils";

const MainNav = async () => {
  const categories = await getCategories();

  const categoriesOptions = [
    ...categories.map((cat) => ({ ...cat, name: capitalizeWord(cat.name) })),
  ];

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
          <Grid item key="all products">
            <NextLink href={`/products`}>All</NextLink>
          </Grid>
          {categoriesOptions.map((category) => (
            <Grid item key={category.id}>
              <NextLink href={`/categories/${category.name.toLowerCase()}`}>
                {category.name}
              </NextLink>
            </Grid>
          ))}
        </Grid>
        <Searchbar />
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;
