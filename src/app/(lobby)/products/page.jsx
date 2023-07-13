import React from "react";
import { Box } from "@mui/material";

import { siteConfig } from "@/config/site";
import PageHeader from "@/components/page-header";
import Products from "@/components/products";
import Pagination from "@/components/pagination";
import ProductFilterSidebar from "@/components/product-filter-sidebar";

const ProductsPage = ({ searchParams }) => {
  const { page } = searchParams;

  return (
    <Box paddingBottom={4}>
      <PageHeader
        title={"products"}
        description="Buy products from our stores"
      />
      <ProductFilterSidebar categories={siteConfig.mainNav} />
      <Products />
      <Pagination count={10} />
    </Box>
  );
};

export default ProductsPage;
