import { Stack, TextField, Button } from "@mui/material";

import { wrapperStyles, inputStyles, newButtonStyles } from "./styles";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import NextLink from "@/components/next-link";
import { routes } from "@/constants";
import DataTableViewOptions from "../data-table-view-options";
import DataTableCategoriesFilter from "../data-table-categories-filter";
import { deleteProductById } from "@/services/product";
import { toast } from "react-toastify";

const DataTableToolbar = ({ table }) => {
  const deleteSelectedProducts = async () => {
    const selectedProducts = table.getSelectedRowModel().flatRows;
    try {
      const deletionPromises = selectedProducts.map(async (product) => {
        await deleteProductById(product.original.id);
      });

      await Promise.all(deletionPromises);
      table.toggleAllPageRowsSelected(false);
      toast.success("Selected products deleted successfully.");
    } catch (error) {
      toast.error("Error deleting selected products:", error.message);
    }
  };

  return (
    <Stack sx={wrapperStyles}>
      <TextField
        label="Filter names..."
        sx={inputStyles}
        value={table?.getColumn("name")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
      />
      <DataTableCategoriesFilter />
      {!!table.getSelectedRowModel().rows.length ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={deleteSelectedProducts}
          startIcon={<DeleteIcon size={"20px"} />}
          sx={newButtonStyles}
        >
          Delete
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutlineIcon size={"20px"} />}
          sx={newButtonStyles}
        >
          <NextLink href={`${routes.dashboardProductsNew}`}>New</NextLink>
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </Stack>
  );
};

export default DataTableToolbar;
