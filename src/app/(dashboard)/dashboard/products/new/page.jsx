import React from "react";

import PageHeader from "@/components/page-header";
import ProductForm from "@/components/forms/product-form";
import { getCategories } from "@/services/categories";
import { createCategoriesOptions } from "@/utils";

const NewProduct = async () => {
  const categories = await getCategories();
  const categoriesOptions = createCategoriesOptions(categories);

  return (
    <>
      <PageHeader
        title={"Add product"}
        description="Add a new product to our store"
      />
      <ProductForm categories={categoriesOptions} />
    </>
  );
};

export default NewProduct;
