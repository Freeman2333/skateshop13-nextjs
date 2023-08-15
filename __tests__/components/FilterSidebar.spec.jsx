import React from "react";
import { render, fireEvent } from "@testing-library/react";
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

  it("sidebar opens when 'Filter' button is clicked", () => {
    const filterButton = screen.getByRole("button", { name: "Filter" });
    fireEvent.click(filterButton);
    const sidebar = screen.queryByRole("heading", { name: /filters/i });
    expect(sidebar).toBeInTheDocument();
  });

  it("sidebar closes when close button is clicked", () => {
    const filterButton = screen.getByRole("button", { name: "Filter" });
    fireEvent.click(filterButton);
    let sidebar = screen.queryByRole("heading", { name: /filters/i });
    expect(sidebar).toBeInTheDocument();

    const closeButton = screen.getByTestId("close-icon");
    fireEvent.click(closeButton);
    sidebar = screen.queryByRole("heading", { name: /filters/i });
    expect(sidebar).not.toBeInTheDocument();
  });
});
