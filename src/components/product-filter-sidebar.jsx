"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Drawer,
  Typography,
  Divider,
  TextField,
  Slider,
  Box,
  Autocomplete,
} from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useDebounce } from "@/hooks/use-debounce";
import { createQueryString } from "@/utils";
import { Close as CloseIcon } from "@mui/icons-material";

const PRODUCTS_PRICE_RANGE = [0, 500];

const ProductFilterSidebar = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const priceRangeParams = searchParams.get("price_range");
  const priceRangeValue = priceRangeParams
    ? priceRangeParams.split("-")
    : PRODUCTS_PRICE_RANGE;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(priceRangeValue);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const debouncedPrice = useDebounce(priceRange);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleMinPriceChange = (event) => {
    const newMinPrice = event.target.value;
    setPriceRange([Number(newMinPrice), priceRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = event.target.value;
    setPriceRange([priceRange[0], Number(newMaxPrice)]);
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategories(newValue);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
  };

  const categoriesOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name.charAt(0).toUpperCase() + cat.name.slice(1),
  }));

  useEffect(() => {
    const [min, max] = debouncedPrice;
    router.push(
      `${pathname}?${createQueryString(searchParams, {
        price_range: `${min}-${max}`,
      })}`
    );
  }, [debouncedPrice]);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString(searchParams, {
        categories: selectedCategories?.length
          ? selectedCategories.map((c) => c.value).join(",")
          : null,
      })}`
    );
  }, [selectedCategories]);

  return (
    <Box marginBottom={2}>
      <Button variant="contained" onClick={handleSidebarToggle}>
        Filter
      </Button>
      <Drawer anchor="right" open={isSidebarOpen} onClose={handleCloseSidebar}>
        <Box
          sx={{
            width: "300px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Filters</Typography>
            <Button onClick={handleCloseSidebar}>
              <CloseIcon />
            </Button>
          </div>
          <Divider style={{ margin: "8px 0" }} />
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={500}
            aria-labelledby="price-range-slider"
            style={{ marginBottom: "16px" }}
          />
          <div style={{ display: "flex" }}>
            <TextField
              label="Min Price"
              type="number"
              min={0}
              fullWidth
              value={priceRange[0]}
              onChange={handleMinPriceChange}
              style={{ marginRight: "8px" }}
            />
            <TextField
              label="Max Price"
              type="number"
              max={500}
              fullWidth
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              style={{ marginLeft: "8px" }}
            />
          </div>
          <Divider style={{ margin: "16px 0" }} />
          <Autocomplete
            multiple
            options={categoriesOptions}
            value={selectedCategories}
            onChange={handleCategoryChange}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                placeholder="select categories"
              />
            )}
          />
          <Button
            variant="contained"
            onClick={clearFilters}
            style={{ marginTop: "auto" }}
          >
            Clear Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ProductFilterSidebar;
