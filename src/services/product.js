import { query } from "@/db";

export const getProductsList = async (
  minPrice,
  maxPrice,
  categoriesIds,
  offset,
  limit
) => {
  let productsQuery;
  let queryValues = [];

  // Create categories placeholder for SQL query
  const categoriesIdsPlaceholders =
    categoriesIds &&
    categoriesIds
      .split(",")
      .map(() => "?")
      .join(",");

  if (categoriesIds) {
    productsQuery = `SELECT *, COUNT(*) OVER() AS total_count FROM product WHERE categoryid IN (${categoriesIdsPlaceholders}) AND price BETWEEN ? AND ? LIMIT ? OFFSET ?
    `;
    queryValues = [
      ...categoriesIds.split(","),
      minPrice,
      maxPrice,
      limit,
      offset,
    ];
  } else {
    productsQuery = `SELECT *, COUNT(*) OVER() AS total_count FROM product WHERE price BETWEEN ? AND ? LIMIT ? OFFSET ?
    `;
    queryValues = [minPrice, maxPrice, limit, offset];
  }

  const res = await query({
    query: productsQuery,
    values: queryValues,
  });
  return res;
};
