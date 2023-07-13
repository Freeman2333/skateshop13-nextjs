"use client";
import React, { useState } from "react";
import { List, ListItem, InputBase, Box } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import { styled, alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
// import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import NextLink from "@/components/next-link";

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
    // vertical padding + font size from searchIcon
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
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);

    // Perform search logic here
    const results = performSearch(newSearchText);
    setSearchResults(results);
  };

  // Example search logic
  const performSearch = (query) => {
    // Replace with your actual search implementation
    // This is just a placeholder
    const data = [
      "Apple",
      "Banana",
      "Cherry",
      "Durian",
      "Elderberry",
      "Fig",
      "Grape",
      "Honeydew",
    ];

    return data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
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
          <List
            sx={{
              position: "absolute",
              background: "white",
              color: "black",
              width: "100%",
            }}
          >
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
