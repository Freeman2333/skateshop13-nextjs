import { Box } from "@mui/material";

import PageHeader from "@/components/page-header";
import Categories from "@/components/categories";
import Products from "@/components/products";
import { getProductsList } from "@/services/product";

export default async function Home() {
  const products = await getProductsList({
    maxPrice: 500,
    minPrice: 470,
    limit: 4,
    offset: 0,
  });

  return (
    <Box paddingY={5}>
      <Box textAlign={"center"}>
        <PageHeader
          title={"Categories"}
          description="Explore our categories and find the best products for you"
        />
      </Box>
      <Categories />
      <Products title="Featured products" products={products} />
    </Box>
  );
}
