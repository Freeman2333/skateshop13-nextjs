import Image from "next/image";
import { Box, Typography, Divider, Grid, Chip } from "@mui/material";

import { dividerStyle } from "./styles";
import { getSingleProduct } from "@/services/product";

import ProductControls from "@/components/product-controls";
import Breadcrumbs from "@/components/breadcrumbs";
import { routes } from "@/constants";

const ProductPage = async ({ params }) => {
  const { productId } = params;

  const product = await getSingleProduct(productId);

  const breadcrumbItems = [
    {
      title: "Products",
      href: routes.products,
    },
    {
      title: product.categoryName,
      href: `${routes.categories}/${product.categoryName}`,
    },
    {
      title: product.name,
      href: `/product/${product.id}`,
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Breadcrumbs breadcrumbItems={breadcrumbItems} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Image
          src={product.image}
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
