import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

import { productCategories } from "@/config/products.consts";
import NextLink from "../next-link";
import {
  cardStyle,
  cardMediaStyle,
  cardContentStyle,
  linkStyles,
} from "./styles";

const ProductCategoriesGrid = () => {
  return (
    <Grid container spacing={2} marginBottom={8}>
      {productCategories.map((category, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>
          <NextLink href={`/category/${category.id}`} style={linkStyles}>
            <Card sx={cardStyle}>
              <CardActionArea>
                <CardMedia
                  sx={cardMediaStyle}
                  image={category.image}
                  title={category.name}
                />
                <CardContent sx={cardContentStyle}>
                  <Typography
                    variant="h5"
                    color={"white"}
                    textTransform={"capitalize"}
                  >
                    {category.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </NextLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCategoriesGrid;
