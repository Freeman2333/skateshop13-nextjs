"use server";
import { revalidatePath } from "next/cache";

import { query } from "@/db";

export const getProductsList = async ({
  minPrice,
  maxPrice,
  categoriesIds,
  offset,
  limit,
  user,
  productName,
}) => {
  let productsQuery = `
    SELECT p.*, c.name AS category, COUNT(*) OVER() AS total_count
    FROM product p
    JOIN category c ON p.categoryid = c.id
    WHERE p.price BETWEEN ? AND ?
  `;
  let queryValues = [String(minPrice), String(maxPrice)];

  // Create categories placeholder for SQL query
  const categoriesIdsPlaceholders =
    categoriesIds &&
    categoriesIds
      .split(",")
      .map(() => "?")
      .join(",");

  if (categoriesIds) {
    productsQuery += ` AND p.categoryid IN (${categoriesIdsPlaceholders}) `;
    queryValues.push(...categoriesIds.split(","));
  }

  if (user) {
    productsQuery += ` AND p.author = ? `;
    queryValues.push(user?.id);
  }

  if (productName) {
    productsQuery += ` AND LOWER(p.name) LIKE ? `;
    queryValues.push(`%${productName.toLowerCase()}%`);
  }

  productsQuery += `LIMIT ? OFFSET ?`;
  queryValues.push(String(limit), String(offset));

  const res = await query({
    query: productsQuery,
    values: queryValues,
  });
  return res;
};

export const getSingleProduct = async (productId) => {
  const productQuery = `
    SELECT p.*, c.name AS categoryName
    FROM product p
    JOIN category c ON p.categoryid = c.id
    WHERE p.id = ?;
`;

  const [product] = await query({ query: productQuery, values: [productId] });
  return product;
};

export async function deleteProductById(productId) {
  const deleteQuery = `
    DELETE FROM product
    WHERE id = :productId
  `;

  await query({
    query: deleteQuery,
    values: { productId },
  });

  revalidatePath(`/dashboard`);
}
