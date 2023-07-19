"use client";
import React, { useState } from "react";
import { List, ListItem, Box } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import SearchIcon from "@mui/icons-material/Search";

import NextLink from "@/components/next-link";
import {
  SearchIconWrapper,
  StyledInputBase,
  Search,
  listStyles,
} from "./style";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    // Perform search logic here
    const results = [];
    setSearchResults(results);
  };

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
          value={searchText}
          onChange={handleSearchChange}
        />
      </Search>
      {!!searchResults.length && (
        <ClickAwayListener onClickAway={() => setSearchResults([])}>
          <List sx={listStyles}>
            {searchResults.map((result, index) => (
              <ListItem key={index}>
                <NextLink href={result}>{result}</NextLink>
              </ListItem>
            ))}
          </List>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default SearchBar;
