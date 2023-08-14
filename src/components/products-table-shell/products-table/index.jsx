import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  Paper,
  TableHead,
  TableRow,
} from "@mui/material";

import ProductTablePagination from "@/components/products-table-shell/product-table-pagination";
import DataTableToolbar from "@/components/products-table-shell/products-table-toolbar";
import { paperStyles } from "./styles";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { createQueryString } from "@/utils";

const ProductsTable = ({ products, columns }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);

  const debouncedName = useDebounce(
    columnFilters.find((f) => f.id === "name")?.value,
    500
  );

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString(searchParams, {
        page: 0,
        name: typeof debouncedName === "string" ? debouncedName : null,
      })}`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName]);

  const table = useReactTable({
    data: products,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualFiltering: true,
  });

  const renderHeaderGroups = () => {
    return table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableCell key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const renderTableBody = () =>
    table.getRowModel().rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ));

  return (
    <>
      <DataTableToolbar table={table} />
      <Paper elevation={2} sx={paperStyles}>
        <Table>
          <TableHead>{renderHeaderGroups()}</TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
        <ProductTablePagination
          table={table}
          count={products[0]?.["total_count"]}
        />
      </Paper>
    </>
  );
};

export default ProductsTable;
