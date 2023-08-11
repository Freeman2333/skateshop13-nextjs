"use server";
import { query } from "@/db";

export const getCategories = async () => {
  const categories = await query({
    query: "SELECT * FROM category",
  });
  return categories;
};
