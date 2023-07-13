import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./product-card";

const products = [
  {
    id: 1,
    name: "Skateboard 1",
    description: "A high-quality skateboard for all skill levels",
    images: ["https://picsum.photos/400/300", "https://picsum.photos/200/300"],
    category: "skateboards",
    subcategory: "Street",
    price: 99.99,
    inventory: 10,
    rating: 4,
    tags: ["skateboarding", "sports"],
    storeId: 1,
    createdAt: "2023-07-12 10:00:00",
  },
  {
    id: 2,
    name: "T-Shirt",
    description: "A comfortable and stylish t-shirt",
    images: ["https://picsum.photos/400/300", "https://picsum.photos/200/300"],
    category: "clothing",
    subcategory: "Men's",
    price: 19.99,
    inventory: 50,
    rating: 5,
    tags: ["fashion", "apparel"],
    storeId: 1,
    createdAt: "2023-07-12 11:00:00",
  },
  {
    id: 1,
    name: "Skateboard 1",
    description: "A high-quality skateboard for all skill levels",
    images: ["https://picsum.photos/400/300", "https://picsum.photos/200/300"],
    category: "skateboards",
    subcategory: "Street",
    price: 99.99,
    inventory: 10,
    rating: 4,
    tags: ["skateboarding", "sports"],
    storeId: 1,
    createdAt: "2023-07-12 10:00:00",
  },
  {
    id: 2,
    name: "T-Shirt",
    description: "A comfortable and stylish t-shirt",
    images: ["https://picsum.photos/400/300", "https://picsum.photos/200/300"],
    category: "clothing",
    subcategory: "Men's",
    price: 19.99,
    inventory: 50,
    rating: 5,
    tags: ["fashion", "apparel"],
    storeId: 1,
    createdAt: "2023-07-12 11:00:00",
  },
  {
    id: 1,
    name: "Skateboard 1",
    description: "A high-quality skateboard for all skill levels",
    images: ["https://picsum.photos/400/300", "https://picsum.photos/200/300"],
    category: "skateboards",
    subcategory: "Street",
    price: 99.99,
    inventory: 10,
    rating: 4,
    tags: ["skateboarding", "sports"],
    storeId: 1,
    createdAt: "2023-07-12 10:00:00",
  },
  {
    id: 2,
    name: "T-Shirt",
    description: "A comfortable and stylish t-shirt",
    images: ["https://picsum.photos/400/300", "https://picsum.photos/200/300"],
    category: "clothing",
    subcategory: "Men's",
    price: 19.99,
    inventory: 50,
    rating: 5,
    tags: ["fashion", "apparel"],
    storeId: 1,
    createdAt: "2023-07-12 11:00:00",
  },
  // Add more products here...
  // Total of 20 products
];

const Products = ({ title }) => {
  return (
    <>
      {title && (
        <Typography
          variant="h4"
          component="h4"
          fontWeight={600}
          textTransform={"capitalize"}
          marginBottom={4}
        >
          {title}
        </Typography>
      )}
      <Grid container spacing={2} marginBottom={5}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.name}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;
