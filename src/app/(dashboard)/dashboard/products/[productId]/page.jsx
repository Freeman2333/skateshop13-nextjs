import React from "react";

import PageHeader from "@/components/page-header";
import ProductForm from "@/components/forms/product-form";
import { getCategories } from "@/services/categories";
import { createCategoriesOptions } from "@/utils";
import { getSingleProduct } from "@/services/product";

const UpdateProductPage = async ({ params }) => {
  const { productId } = params;
  const product = await getSingleProduct(productId);

  const categories = await getCategories();
  const categoriesOptions = createCategoriesOptions(categories);

  return (
    <>
      <PageHeader
        title={"Update product"}
        description="Update your product information"
      />
      <ProductForm categories={categoriesOptions} product={product} />
    </>
  );
};

export default UpdateProductPage;
