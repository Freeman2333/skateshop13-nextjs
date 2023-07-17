import React from "react";
import { Box } from "@mui/material";

import PageHeader from "@/components/page-header";
import Products from "@/components/products";
import Pagination from "@/components/pagination";
import ProductFilterSidebar from "@/components/product-filter-sidebar";
import { query } from "@/db";

const PAGE_SIZE = 8;

const ProductsPage = async ({ searchParams }) => {
  const { page, price_range, categories: categoriesIds } = searchParams;

  const minPrice = price_range ? price_range.split("-")[0] : String(0);
  const maxPrice = price_range ? price_range.split("-")[1] : String(500);

  const categories = await query({
    query: "SELECT * FROM category",
  });

  const offset = String(PAGE_SIZE * ((page || 1) - 1));
  const limit = String(PAGE_SIZE);

  // Create categories placeholder for SQL query
  const categoriesIdsPlaceholders =
    categoriesIds &&
    categoriesIds
      .split(",")
      .map(() => "?")
      .join(",");

  // get all products based on conditions for pagination
  const filteredProductQuery = {
    query: categoriesIds
      ? `SELECT * FROM product WHERE price BETWEEN ? AND ? AND categoryid IN (${categoriesIdsPlaceholders})`
      : "SELECT * FROM product WHERE price BETWEEN ? AND ?",
    values: categoriesIds
      ? [minPrice, maxPrice, ...categoriesIds.split(",")]
      : [minPrice, maxPrice],
  };
  const filteredProducts = await query(filteredProductQuery);

  //Get products for a page
  const paginatedProductQuery = {
    query: categoriesIds
      ? `SELECT * FROM product WHERE price BETWEEN ? AND ? AND categoryid IN (${categoriesIdsPlaceholders}) LIMIT ? OFFSET ?`
      : "SELECT * FROM product WHERE price BETWEEN ? AND ? LIMIT ? OFFSET ?",
    values: categoriesIds
      ? [minPrice, maxPrice, ...categoriesIds.split(","), limit, offset]
      : [minPrice, maxPrice, limit, offset],
  };

  const paginatedProducts = await query(paginatedProductQuery);

  return (
    <Box paddingBottom={4}>
      <PageHeader
        title={"products"}
        description="Buy products from our stores"
      />
      <ProductFilterSidebar categories={categories} />
      <Products products={paginatedProducts} />
      <Pagination count={Math.ceil(filteredProducts.length / PAGE_SIZE)} />
    </Box>
  );
};

export default ProductsPage;
