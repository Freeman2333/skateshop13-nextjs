"use client";
import { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { getCategories } from "@/services/categories";
import { createCategoriesOptions, createQueryString } from "@/utils";
import { autocompleteStyles } from "./styles";

const DataTableCategoriesFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategories(newValue);
  };

  const categoriesOptions = createCategoriesOptions(categories);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

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
    <>
      {categories && categories.length && (
        <Autocomplete
          multiple
          options={categoriesOptions}
          value={selectedCategories}
          onChange={handleCategoryChange}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          filterSelectedOptions
          sx={autocompleteStyles}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categories"
              placeholder="select categories"
            />
          )}
        />
      )}
    </>
  );
};

export default DataTableCategoriesFilter;
