import { Box } from "@mui/material";

import PageHeader from "@/components/page-header";
import Categories from "@/components/categories";
import Products from "@/components/products";

export default function Home() {
  return (
    <Box paddingY={5}>
      <Box textAlign={"center"}>
        <PageHeader
          title={"Categories"}
          description="Explore our categories and find the best products for you"
        />
      </Box>
      <Categories />
      <Products title="Featured products" />
    </Box>
  );
}
