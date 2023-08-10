import { Stack, TextField } from "@mui/material";

import { wrapperStyles, inputStyles } from "./styles";

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
    </Stack>
  );
};

export default DataTableToolbar;
