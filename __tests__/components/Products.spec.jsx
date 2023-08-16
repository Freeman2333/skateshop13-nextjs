import React from "react";
import { render } from "@testing-library/react";
import Products from "@/components/products";
import cartStore from "@/store/cart.store";
import userEvent from "@testing-library/user-event";

const mockProducts = [
  { name: "Product 1", price: 10.99, description: "Description of Product 1" },
  { name: "Product 2", price: 19.99, description: "Description of Product 2" },
];

describe("Products Component", () => {
  it("renders title if provided", () => {
    const title = "Featured Products";
    const { getByRole } = render(<Products title={title} />);
    const titleElement = getByRole("heading", {
      name: title,
    });
    expect(titleElement).toBeInTheDocument();
  });

  it("does not render title if not provided", () => {
    const { queryByRole } = render(<Products />);
    const titleElement = queryByRole("heading", {
      name: "Featured Products",
    });
    expect(titleElement).toBeNull();
  });

  it("renders ProductCard components with correct product data", () => {
    const { getByText } = render(<Products products={mockProducts} />);
    mockProducts.forEach((product) => {
      const productElement = getByText(product.name);
      expect(productElement).toBeInTheDocument();
    });
  });

  it("should add product to card", async () => {
    const { getAllByTestId } = render(<Products products={mockProducts} />);
    const productCardElements = getAllByTestId("product-card");
    expect(productCardElements).toHaveLength(mockProducts.length);

    expect(cartStore.totalCount).toBe(0);

    await userEvent.click(productCardElements[0].querySelector(".button--add"));
    expect(cartStore.totalCount).toBe(1);

    await userEvent.click(productCardElements[0].querySelector(".button--add"));
    expect(cartStore.totalCount).toBe(2);

    await userEvent.click(productCardElements[0].querySelector(".button--add"));
    expect(cartStore.totalCount).toBe(3);
  });
});
