"use client";
import React, { useState, useEffect } from "react";
import { List, ListItem, InputBase, Box } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import NextLink from "@/components/next-link";
import { useDebounce } from "@/hooks/use-debounce";
import { filterProducts as filterProductsAction } from "@/app/_actions/product";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
          <List
            sx={{
              position: "absolute",
              background: "white",
              color: "black",
              width: "100%",
              zIndex: "9999",
              border: "gray 1px solid",
            }}
          >
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
