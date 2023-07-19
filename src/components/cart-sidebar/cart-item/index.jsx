"use client";
import Image from "next/image";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { Plus, Minus } from "lucide-react";
import { Delete } from "@mui/icons-material";

import { cartItemWrapper, cartItemLeft, cartItemRight } from "./style";
import { useState } from "react";

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityDecrease = () => {
    setQuantity((num) => num - 1);
  };

  const handleQuantityIncrease = () => {
    setQuantity((num) => num + 1);
  };

  return (
    <Box sx={cartItemWrapper}>
      <Box sx={cartItemLeft}>
        <Image
          src="http://dummyimage.com/600x400.png/dddddd/000000"
          width={64}
          height={64}
          alt="Product Image"
        />
        <Box marginLeft="20px">
          <Typography variant="subtitle1">{"product.name"}</Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            $ {"product.price"}
          </Typography>
          <Typography variant="body2" color={"text.secondary"}>
            {"product.category"}
          </Typography>
        </Box>
      </Box>
      <Box sx={cartItemRight}>
        <IconButton onClick={() => handleQuantityDecrease()} variant="outlined">
          <Minus size={"12px"} />
        </IconButton>
        <TextField
          type="number"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          inputProps={{ min: 0 }}
          sx={{ width: 70, textAlign: "center" }}
        />
        <IconButton onClick={() => handleQuantityIncrease()} variant="outlined">
          <Plus size={"12px"} />
        </IconButton>

        <IconButton
          onClick={() => handleRemoveProduct(product.id)}
          variant="outlined"
        >
          <Delete size={"12px"} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
