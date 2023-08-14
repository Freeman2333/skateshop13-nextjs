import { useState } from "react";
import {
  Menu,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

const DataTableViewOptions = ({ table }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        startIcon={<TuneIcon />}
      >
        View
      </Button>
      <Menu
        id="multiselect-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => (
            <MenuItem key={column.field} value={column.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={column.getIsVisible()}
                    onChange={(e) => {
                      column.toggleVisibility(!!e.target.checked);
                    }}
                  />
                }
                label={column.id}
              />
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default DataTableViewOptions;
