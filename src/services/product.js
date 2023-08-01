import { query } from "@/db";

export const getProductsList = async ({
  minPrice,
  maxPrice,
  categoriesIds,
  offset,
  limit,
}) => {
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
      String(minPrice),
      String(maxPrice),
      String(limit),
      String(offset),
    ];
  } else {
    productsQuery = `SELECT *, COUNT(*) OVER() AS total_count FROM product WHERE price BETWEEN ? AND ? LIMIT ? OFFSET ?
    `;
    queryValues = [
      String(minPrice),
      String(maxPrice),
      String(limit),
      String(offset),
    ];
  }

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
