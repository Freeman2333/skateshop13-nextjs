import React from "react";
import { render, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import SearchBar from "@/components/searchbar";

jest.mock("@/app/_actions/product", () => ({
  filterProducts: jest.fn((query) => {
    if (query === "product") {
      // Return mock data when "product" is passed as query
      return Promise.resolve([
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ]);
    } else {
      // Return empty array for other queries
      return Promise.resolve([]);
    }
  }),
}));

const renderSearchBar = () => {
  return render(<SearchBar />);
};

describe("SearchBar", () => {
  test("renders the search input and search icon", () => {
    const { getByPlaceholderText, getByLabelText } = renderSearchBar();

    expect(getByPlaceholderText("Search…")).toBeInTheDocument();
    expect(getByLabelText("search")).toBeInTheDocument();
  });

  // test("displays search results when typing in the search input", async () => {
  //   const { getByPlaceholderText, findByText } = renderSearchBar();

  //   const searchInput = getByPlaceholderText("Search…");

  //   // Use userEvent.type to simulate typing in the search input
  //   await act(async () => {
  //     userEvent.type(searchInput, "product");
  //   });

  //   await waitFor(async () => {
  //     const product1 = await findByText("Product 1");
  //     const product2 = await findByText("Product 2");

  //     expect(product1).toBeInTheDocument();
  //     expect(product2).toBeInTheDocument();
  //   });
  // });

  test("hides search results when search input is cleared", async () => {
    const { getByPlaceholderText, findByText, queryByText } = renderSearchBar();

    const searchInput = getByPlaceholderText("Search…");

    await act(async () => {
      userEvent.type(searchInput, "product");
    });

    const product = await findByText("Product 1");

    expect(product).toBeInTheDocument();

    // Use userEvent.clear to clear the search input
    await act(async () => {
      userEvent.clear(searchInput);
    });

    // Wait for the state update to complete inside useEffect
    await waitFor(() => {
      expect(queryByText("Product 1")).not.toBeInTheDocument();
    });
  });
});
