"use client";
import { useState } from "react";

import { Grid, Button, TextField } from "@mui/material";
import CartStore from "@/store/cart.store";

const ProductControls = ({ product }) => {
  const [productCount, setproductCount] = useState(0);

  return (
    <Grid container spacing={2} direction={"column"} maxWidth={"240px"}>
      <Grid item xs={6} md={4}>
        <TextField
          type="number"
          label="Quantity"
          value={productCount}
          onChange={(e) => setproductCount(+e.target.value)}
          variant="outlined"
          inputProps={{ min: 0 }}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => CartStore.addProductToCart(product, productCount)}
          fullWidth
        >
          Add to Cart
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductControls;
