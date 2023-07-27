import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "@/components/cart-sidebar";
import cartStore from "@/store/cart.store";
import { mockCart } from "../../__mocks__/data";

describe("Cart Component", () => {
  beforeEach(async () => {
    // open cart before each test
    render(<Cart />);
    const cartButton = screen.getByRole("button", { name: /open cart/i });
    await userEvent.click(cartButton);
  });

  it("Cart closes on button click", async () => {
    expect(screen.getByText("Cart is empty")).toBeInTheDocument();

    // Check if the cart is closed on close button clicked
    const closeIcon = screen.getByTestId("CloseIcon");
    await userEvent.click(closeIcon);

    const cart = screen.queryByRole("heading", { name: /cart/i });
    expect(cart).not.toBeInTheDocument();
  });

  describe("render with mobx", () => {
    beforeEach(() => {
      mockCart.items.forEach((itemPizza, indx) => {
        cartStore.addProductToCart(itemPizza);
      });
    });

    afterEach(() => {
      cartStore.clearCart();
    });

    it("should render with cart state", async () => {
      // check total items count
      expect(screen.getByTestId("card-total-count")).toHaveTextContent(
        `(${cartStore.totalCount})`
      );

      // check total items price
      expect(screen.getByTestId("card-total-price")).toHaveTextContent(
        `${cartStore.totalPrice}`
      );

      expect(screen.getAllByTestId("shopping-cart-item").length).toBe(
        mockCart.items.length
      );
    });

    it("change the number of products, plus one", async () => {
      expect(screen.getByTestId("card-total-count")).toHaveTextContent(`(3)`);

      const plusIcons = screen.getAllByTestId("cart-item-plus");
      await userEvent.click(plusIcons[0]);
      expect(screen.getByTestId("card-total-count")).toHaveTextContent(`(4)`);

      await userEvent.click(plusIcons[0]);
      expect(screen.getByTestId("card-total-count")).toHaveTextContent(`(5)`);
    });

    it("remove product item if click delete button", async () => {
      expect(screen.getByTestId("card-total-count")).toHaveTextContent(`(3)`);
      let deleteButtons = screen.getAllByTestId("cart-item-delete");

      await userEvent.click(deleteButtons[0]);
      expect(screen.getByTestId("card-total-count")).toHaveTextContent(`(2)`);

      deleteButtons = screen.getAllByTestId("cart-item-delete");
      await userEvent.click(deleteButtons[0]);
      expect(screen.getByTestId("card-total-count")).toHaveTextContent(`(1)`);
    });
  });
});
