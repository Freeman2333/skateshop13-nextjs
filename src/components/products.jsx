import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./product-card";
import { products } from "@/config/products.consts";

const Products = ({ title }) => {
  return (
    <>
      {title && (
        <Typography
          variant="h4"
          component="h4"
          fontWeight={600}
          textTransform={"capitalize"}
          marginBottom={4}
        >
          {title}
        </Typography>
      )}
      <Grid container spacing={2} marginBottom={5}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.name}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;
