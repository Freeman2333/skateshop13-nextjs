import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductFilterSidebar from "@/components/product-filter-sidebar";
import { useRouter } from "next/navigation";

// Mock useRouter and useSearchParams
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mock the categories data
const categories = [
  { id: 1, name: "Category1" },
  { id: 2, name: "Category2" },
];

describe("ProductFilterSidebar", () => {
  let screen;

  beforeEach(() => {
    // Render the component for each test case
    screen = render(<ProductFilterSidebar categories={categories} />);
  });

  it("sidebar opens when 'Filter' button is clicked", async () => {
    const filterButton = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterButton);
    const sidebar = screen.queryByRole("heading", { name: /filters/i });
    expect(sidebar).toBeInTheDocument();
  });

  it("sidebar closes when close button is clicked", async () => {
    const filterButton = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterButton);
    let sidebar = screen.queryByRole("heading", { name: /filters/i });
    expect(sidebar).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-icon");
    await userEvent.click(closeButton);
    sidebar = screen.queryByRole("heading", { name: /filters/i });
    expect(sidebar).not.toBeInTheDocument();
  });

  it("Min Price change updates router push", async () => {
    const filterButton = screen.getByRole("button", { name: "Filter" });
    await userEvent.click(filterButton);

    const minPriceInput = screen.getByLabelText("Min Price");

    userEvent.clear(minPriceInput);
    userEvent.type(minPriceInput, "50"); // Type the new value '50'

    // Check if router.push is called with the expected URL
    expect(useRouter().push).toHaveBeenCalledWith("/?price_range=50-500");
    expect(useRouter().push).toHaveBeenCalledTimes(1);
  });
});
