import TablePagination from "@mui/material/TablePagination";
import { Stack, Typography } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createQueryString } from "@/utils";

export default function TablePaginationComponent({ count, table }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = searchParams?.get("page") ?? "0";
  const rowsPerPage = searchParams?.get("per_page") ?? "10";

  const handleChangePage = (_, newPage) => {
    router.push(
      `${pathname}?${createQueryString(searchParams, {
        page: newPage,
      })}`
    );
  };

  const handleChangeRowsPerPage = (event) => {
    router.push(
      `${pathname}?${createQueryString(searchParams, {
        per_page: parseInt(event.target.value, 10),
        page: 0,
      })}`
    );
  };

  return (
    <Stack
      padding={"20px 20px 0 20px"}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant="subtitle1" component="p" color="text.secondary">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </Typography>
      <TablePagination
        component="div"
        count={count}
        page={+page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
