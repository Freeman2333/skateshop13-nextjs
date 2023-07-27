import React from "react";
import { Box } from "@mui/material";

import PageHeader from "@/components/page-header";
import Products from "@/components/products";
import Pagination from "@/components/pagination";
import ProductFilterSidebar from "@/components/product-filter-sidebar";
import { getProductsList } from "@/services/product";
import { getCategories } from "@/services/categories";

const PAGE_SIZE = 8;

const ProductsPage = async ({ searchParams }) => {
  const { page, price_range, categories: categoriesIds } = searchParams;

  const minPrice = price_range ? price_range.split("-")[0] : String(0);
  const maxPrice = price_range ? price_range.split("-")[1] : String(500);
  const offset = String(PAGE_SIZE * ((page || 1) - 1));
  const limit = String(PAGE_SIZE);

  const categories = await getCategories();

  const products = await getProductsList({
    minPrice,
    maxPrice,
    categoriesIds,
    offset,
    limit,
  });

  if (!products?.length) {
    return "no products found";
  }

  return (
    <Box paddingBottom={4}>
      <PageHeader
        title={"products"}
        description="Buy products from our stores"
      />
      <ProductFilterSidebar categories={categories} />
      <Products products={products} />
      <Pagination count={Math.ceil(products[0].total_count / PAGE_SIZE)} />
    </Box>
  );
};

export default ProductsPage;
