"use server";
import { query } from "@/db";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth";

export async function filterProducts(searchString) {
  const products = await query({
    query: "SELECT * FROM product WHERE LOWER(name) LIKE ? LIMIT 10",
    values: [`%${searchString.toLowerCase()}%`],
  });
  return products;
}
