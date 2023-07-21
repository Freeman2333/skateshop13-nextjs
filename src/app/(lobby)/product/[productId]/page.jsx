import Image from "next/image";
import { Box, Typography, Divider, Grid, Chip } from "@mui/material";

import { dividerStyle } from "./styles";
import { getSingleProduct } from "@/services/product";

import ProductControls from "@/components/product-controls";

const ProductPage = async ({ params }) => {
  const { productId } = params;

  const product = await getSingleProduct(productId);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Image
          src="http://dummyimage.com/600x400.png/dddddd/000000"
          width={600}
          height={400}
          alt="Product Image"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box p={2}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            $ {product.price}
          </Typography>
          <Chip label={product.categoryName} color="primary" />
          <Divider sx={dividerStyle} />
          <ProductControls product={product} />
          <Divider sx={dividerStyle} />
          <Typography variant="body1">{product.description}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
