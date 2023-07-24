import React from "react";
import { render } from "@testing-library/react";
import Products from "@/components/products";

const mockProducts = [
  { name: "Product 1", price: 10.99, description: "Description of Product 1" },
  { name: "Product 2", price: 19.99, description: "Description of Product 2" },
];

describe("Products Component", () => {
  test("renders title if provided", () => {
    const title = "Featured Products";
    const { getByRole } = render(<Products title={title} />);
    const titleElement = getByRole("heading", {
      name: title,
    });
    expect(titleElement).toBeInTheDocument();
  });

  test("does not render title if not provided", () => {
    const { queryByRole } = render(<Products />);
    const titleElement = queryByRole("heading", {
      name: "Featured Products",
    });
    expect(titleElement).toBeNull();
  });

  test("renders ProductCard components with correct product data", () => {
    const { getByText } = render(<Products products={mockProducts} />);
    mockProducts.forEach((product) => {
      const productElement = getByText(product.name);
      expect(productElement).toBeInTheDocument();
    });
  });

  test("renders correct number of ProductCard components", () => {
    const { getAllByTestId } = render(<Products products={mockProducts} />);
    const productCardElements = getAllByTestId("product-card");
    expect(productCardElements).toHaveLength(mockProducts.length);
  });
});
