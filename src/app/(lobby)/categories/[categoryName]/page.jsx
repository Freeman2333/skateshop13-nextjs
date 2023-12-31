import React from "react";
import { Box } from "@mui/material";

import PageHeader from "@/components/page-header";
import Products from "@/components/products";
import Pagination from "@/components/pagination";
import ProductFilterSidebar from "@/components/product-filter-sidebar";
import { getProductsList } from "@/services/product";
import { getCategories } from "@/services/categories";

const PAGE_SIZE = 8;

const ProductsPage = async ({ searchParams, params }) => {
  const { page, price_range, sort } = searchParams;
  const { categoryName } = params;

  const minPrice = price_range ? price_range.split("-")[0] : String(0);
  const maxPrice = price_range ? price_range.split("-")[1] : String(500);
  const offset = String(PAGE_SIZE * ((page || 1) - 1));
  const limit = String(PAGE_SIZE);

  const categories = await getCategories();
  const currentCategory = categories.find((cat) => cat.name === categoryName);

  if (!currentCategory) {
    return "category not found";
  }

  const currentCategoryId = currentCategory.id;

  const products = await getProductsList({
    minPrice,
    maxPrice,
    categoriesIds: String(currentCategoryId),
    offset,
    limit,
    sort: typeof sort === "string" ? sort : null,
  });

  if (!products?.length) {
    return "no products found";
  }

  return (
    <Box paddingBottom={4}>
      <PageHeader
        title={categoryName}
        description={`Buy ${categoryName} from our stores`}
      />
      <ProductFilterSidebar />
      <Products products={products} />
      <Pagination count={Math.ceil(products[0].total_count / PAGE_SIZE)} />
    </Box>
  );
};

export default ProductsPage;
