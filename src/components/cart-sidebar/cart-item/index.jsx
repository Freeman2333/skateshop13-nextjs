"use client";
import Image from "next/image";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { Plus, Minus } from "lucide-react";
import { Delete } from "@mui/icons-material";

import { cartItemWrapper, cartItemLeft, cartItemRight } from "./style";
import CartStore from "@/store/cart.store";

const CartItem = ({ item, index }) => {
  return (
    <Box sx={cartItemWrapper} data-testId="shopping-cart-item">
      <Box sx={cartItemLeft}>
        <Image src={item.image} width={64} height={64} alt="Product Image" />
        <Box marginLeft="20px">
          <Typography variant="subtitle1">{item.name.slice(0, 14)}</Typography>
          <Typography variant="subtitle2" color={"text.secondary"}>
            $ {item.price}
          </Typography>
        </Box>
      </Box>
      <Box sx={cartItemRight}>
        <IconButton
          onClick={() => CartStore.minusCartItem(index)}
          variant="outlined"
        >
          <Minus size={"12px"} />
        </IconButton>
        <TextField
          type="number"
          variant="outlined"
          value={item.countItem}
          onChange={(e) => CartStore.updateCartItem(+e.target.value, index)}
          inputProps={{ min: 0 }}
        />
        <IconButton
          onClick={() => CartStore.plusCartItem(index)}
          variant="outlined"
          data-testId="cart-item-plus"
        >
          <Plus size={"12px"} />
        </IconButton>

        <IconButton
          onClick={() => CartStore.removeCartItem(index)}
          variant="outlined"
          data-testId="cart-item-delete"
        >
          <Delete size={"12px"} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
