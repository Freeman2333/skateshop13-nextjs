"use server";
import { query } from "@/db";

export async function filterProducts(searchString) {
  const products = await query({
    query: "SELECT * FROM product WHERE name LIKE ?",
    values: [`%${searchString}%`],
  });
  return products;
}
