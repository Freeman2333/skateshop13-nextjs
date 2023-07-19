"use client";
import { useState } from "react";
import {
  IconButton,
  Box,
  Drawer,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { ShoppingCart } from "lucide-react";
import {
  DrawerInnerBoxStyle,
  DrawerHeaderStyle,
  CloseIconStyle,
  DrawerFooterStyle,
} from "./styles";
import CartItem from "./cart-item";

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="Open Cart"
        onClick={handleCartOpen}
      >
        <ShoppingCart />
      </IconButton>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Box sx={DrawerInnerBoxStyle}>
          <Box sx={DrawerHeaderStyle}>
            <Typography variant="h6">Cart</Typography>
            <IconButton
              color="inherit"
              sx={CloseIconStyle}
              onClick={() => setIsCartOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box marginTop="20px">
            {[1, 2, 3].map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>
          <Divider sx={{ marginTop: "auto" }} />
          <Box sx={DrawerFooterStyle}>
            <Typography variant="subtitle1">Total price:</Typography>
            <Typography variant="subtitle1">${43}</Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
