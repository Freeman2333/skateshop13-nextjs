"use client";
import React, { useState, useEffect } from "react";
import { List, ListItem, Box } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import SearchIcon from "@mui/icons-material/Search";

import NextLink from "@/components/next-link";
import { useDebounce } from "@/hooks/use-debounce";
import { filterProducts as filterProductsAction } from "@/app/_actions/product";
import {
  SearchIconWrapper,
  StyledInputBase,
  Search,
  listStyles,
} from "./style";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedQuery = useDebounce(searchQuery);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filterProducts = async () => {
      const data = await filterProductsAction(debouncedQuery);
      setSearchResults(data);
    };

    if (debouncedQuery.length > 0) {
      filterProducts();
    }
  }, [debouncedQuery]);

  return (
    <Box position={"relative"}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Search>
      {!!searchResults.length && !!debouncedQuery.length && (
        <ClickAwayListener onClickAway={() => setSearchResults([])}>
          <List sx={listStyles}>
            {searchResults.map((product, index) => (
              <ListItem key={index}>
                <NextLink href={`/product/${product.id}`}>
                  {product.name}
                </NextLink>
              </ListItem>
            ))}
          </List>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default SearchBar;
