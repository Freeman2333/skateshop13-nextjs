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

import CartStore from "@/store/cart.store";
import { routes } from "@/constants";

const ProductCard = ({ product }) => {
  const { name, price, image } = product;

  return (
    <Card>
      <NextLink href={`${routes.product}/${product.id}`}>
        <CardMedia
          component="img"
          image={image}
          alt={name}
          height={200}
          sx={{ objectFit: "cover" }}
        />
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
        <Stack gap={2} direction={"horizontal"}>
          <Button
            variant="outlined"
            color="primary"
            component={NextLink}
            href={`/product/${product.id}`}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => CartStore.addProductToCart(product)}
          >
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
