import React from "react";
import { Box } from "@mui/material";

import PageHeader from "@/components/page-header";
import Products from "@/components/products";
import Pagination from "@/components/pagination";

const ProductsPage = ({ searchParams }) => {
  const { page } = searchParams;

  return (
    <Box paddingBottom={4}>
      <PageHeader
        title={"products"}
        description="Buy products from our stores"
      />
      <Products />
      <Pagination count={10} />
    </Box>
  );
};

export default ProductsPage;
