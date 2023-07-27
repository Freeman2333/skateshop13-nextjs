"use client";
import { useState } from "react";
import {
  IconButton,
  Box,
  Drawer,
  Typography,
  Divider,
  Button,
  Badge,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { observer } from "mobx-react-lite";

import { ShoppingCart } from "lucide-react";
import {
  DrawerInnerBoxStyle,
  DrawerHeaderStyle,
  CloseIconStyle,
  DrawerFooterStyle,
  bottomDividerStyle,
} from "./styles";
import CartItem from "./cart-item";
import cartStore from "@/store/cart.store";

const Cart = observer(() => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { totalCount, items, totalPrice } = cartStore;

  const handleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  const renderCartItems = () => {
    return (
      <>
        {!items.length
          ? "Cart is empty"
          : items.map((item, index) => (
              <CartItem key={item.id + index} item={item} index={index} />
            ))}
      </>
    );
  };

  return (
    <>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="Open Cart"
        onClick={handleCartOpen}
      >
        <Badge badgeContent={totalCount} color="error">
          <ShoppingCart />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Box sx={DrawerInnerBoxStyle}>
          <Box sx={DrawerHeaderStyle}>
            <Typography variant="h6">
              Cart{" "}
              <span data-testid="card-total-count">
                {+totalCount > 0 && `(${totalCount})`}
              </span>
            </Typography>
            <IconButton
              color="inherit"
              sx={CloseIconStyle}
              onClick={() => setIsCartOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box marginTop="20px">{renderCartItems()}</Box>
          <Divider sx={bottomDividerStyle} />
          <Box sx={DrawerFooterStyle}>
            <Typography variant="subtitle1">Total price:</Typography>
            <Typography data-testid="card-total-price" variant="subtitle1">
              ${totalPrice}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth>
            Checkout
          </Button>
        </Box>
      </Drawer>
    </>
  );
});

export default Cart;
