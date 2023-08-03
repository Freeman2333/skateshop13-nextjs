"use server";
import { query } from "@/db";

export async function filterProducts(searchString) {
  const products = await query({
    query: "SELECT * FROM product WHERE LOWER(name) LIKE ? LIMIT 10",
    values: [`%${searchString.toLowerCase()}%`],
  });
  return products;
}
