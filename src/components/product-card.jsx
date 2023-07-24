"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import NextLink from "./next-link";

const ProductCard = ({ product }) => {
  const { name, price, image } = product;

  return (
    <Card data-testid="product-card">
      <NextLink href={`/product/${product.id}`}>
        <CardMedia component="img" image={image} alt={name} />
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Price: ${price}
          </Typography>
        </CardContent>
      </NextLink>
      <CardContent>
        <Stack gap={2} direction={"row"}>
          <Button
            variant="outlined"
            color="primary"
            component={NextLink}
            href={`/product/${product.id}`}
          >
            Preview
          </Button>
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
