import React from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";

import NextLink from "@/components/next-link";
import { routes } from "@/constants";
import { deleteProductById } from "@/services/product";

export function ProductRowActions({ product }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProductById(product.id);
      toast.success("Product deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Button
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="text"
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* TODO correct routin when PR with routes is merged */}
        <MenuItem
          component={NextLink}
          href={`${routes.dashboardProducts}/${product.id}`}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem component={NextLink} href={`${routes.product}/${product.id}`}>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <ListItemText primary="View" />
        </MenuItem>
        <MenuItem onClick={handleDeleteProduct}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
}
