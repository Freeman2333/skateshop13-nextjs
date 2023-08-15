"use server";
import { query } from "@/db";
import { getServerSession } from "next-auth";
import Joi from "joi";

import authOptions from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { routes } from "@/constants";

const productSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
  description: Joi.string().max(500),
  category: Joi.number().required(),
  price: Joi.number().required().positive().integer(),
  image: Joi.string().required(),
});

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

  const count = await query({
    query: `
      SELECT COUNT(*) AS count
      FROM product
      WHERE name = :name
    `,
    values: { name: productName },
  });

  if (count[0].count > 0) {
    throw new Error("Product name already taken.");
  }
}

export async function addProductAction(input) {
  const session = await getServerSession(authOptions);

  const { error } = productSchema.validate(input);
  if (error) {
    throw new Error("Invalid input data.");
  }

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
  const { error } = productSchema.validate(input);
  if (error) {
    throw new Error("Invalid input data.");
  }

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
