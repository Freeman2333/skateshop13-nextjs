import { Stack, TextField, Button } from "@mui/material";

import { wrapperStyles, inputStyles, newButtonStyles } from "./styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NextLink from "@/components/next-link";
import { routes } from "@/constants";
import DataTableViewOptions from "../data-table-view-options";

const DataTableToolbar = ({ table }) => {
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
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddCircleOutlineIcon size={"20px"} />}
        sx={newButtonStyles}
      >
        <NextLink href={`${routes.dashboardProductsNew}`}>New</NextLink>
      </Button>
      <DataTableViewOptions table={table} />
    </Stack>
  );
};

export default DataTableToolbar;
