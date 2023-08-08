import React from "react";
import { getServerSession } from "next-auth";

import PageHeader from "@/components/page-header";
import DataTableShell from "@/components/products-table-shell";
import authOptions from "@/lib/auth";
import { getProductsList } from "@/services/product";

const PAGE_SIZE = 10;

const DashboardPage = async ({ searchParams }) => {
  const { page, price_range, categories: categoriesIds } = searchParams;

  const minPrice = price_range ? price_range.split("-")[0] : String(0);
  const maxPrice = price_range ? price_range.split("-")[1] : String(500);
  const offset = String(PAGE_SIZE * ((page || 1) - 1));
  const limit = String(PAGE_SIZE);

  const session = await getServerSession(authOptions);
  const user = session?.user;

  const products = await getProductsList({
    minPrice,
    maxPrice,
    categoriesIds,
    offset,
    limit,
    user,
  });

  return (
    <>
      <PageHeader title={"Your products"} description="Manage your products" />
      <DataTableShell products={products}></DataTableShell>
      DashboardPage
    </>
  );
};

export default DashboardPage;
