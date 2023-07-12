import React from "react";

import PageHeader from "@/components/page-header";
import Products from "@/components/products";

const ProductsPage = () => {
  return (
    <>
      <PageHeader
        title={"products"}
        description="Buy products from our stores"
      />
      <Products />
      ProductsPage
    </>
  );
};

export default ProductsPage;
