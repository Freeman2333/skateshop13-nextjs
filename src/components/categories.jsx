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
import NextLink from "./next-link";

const ProductCategoriesGrid = () => {
  const cardStyle = {
    position: "relative",
    "&:hover .MuiCardMedia-root": {
      transform: "scale(1.05)",
    },
  };

  const cardMediaStyle = {
    overflow: "hidden",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.15)",
    },
    height: 200,
    "@media (min-width:600px)": {
      height: 300,
    },
    "@media (min-width:960px)": {
      height: 400,
    },
    "&:after": {
      content: '" "',
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  };

  const cardContentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    padding: "16px",
  };

  return (
    <Grid container spacing={2} marginBottom={8}>
      {productCategories.map((category, index) => (
        <Grid item xs={6} sm={6} md={3} key={index}>
          <NextLink
            href={`/category/${category.id}`}
            style={{ textDecoration: "none" }}
          >
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
