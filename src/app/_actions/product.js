"use server";
import { query } from "@/db";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { routes } from "@/constants";

export async function filterProducts(searchString) {
  const products = await query({
    query: "SELECT * FROM product WHERE LOWER(name) LIKE ? LIMIT 10",
    values: [`%${searchString.toLowerCase()}%`],
  });
  return products;
}

export async function checkProductAction(productName) {
  if (typeof productName !== "string") {
    throw new Error("Invalid input.");
  }

  const productWithSameName = await query({
    query: `
      SELECT *
      FROM product
      WHERE name = :name
    `,
    values: { name: productName },
  });

  if (productWithSameName.length > 0) {
    throw new Error("Product name already taken.");
  }
}

export async function addProductAction(input) {
  const session = await getServerSession(authOptions);

  await query({
    query:
      "INSERT INTO product (name, description, categoryid, price, image, author) VALUES (?, ?, ?, ?, ?, ?)",
    values: [
      input.name,
      input.description,
      input.category,
      input.price,
      input.image,
      session?.user?.id,
    ],
  });
}

export async function updateProductAction(id, input) {
  await query({
    query:
      "UPDATE product SET name = ?, description = ?, categoryid = ?, price = ?, image = ? WHERE id = ? ",
    values: [
      input.name,
      input.description,
      input.category,
      input.price,
      input.image,
      id,
    ],
  });
  revalidatePath(`${routes.dashboardProducts}/${id}`);
}
