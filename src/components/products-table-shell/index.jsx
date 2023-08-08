"use client";
import React, { useMemo } from "react";
import { Chip, Checkbox } from "@mui/material";

import DataTableToolbar from "@/components/products-table-shell/products-table-toolbar";
import ProductsTable from "@/components/products-table-shell/products-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { ProductRowActions } from "./actions-cell";
import { formatDate } from "@/utils";

const ProductTableShell = ({ products }) => {
  const columns = useMemo(
    () => [
      {
        // Column for row selection
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onChange={(e) => {
              table.toggleAllPageRowsSelected(!!e.target.checked);
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => {
          return (
            <Checkbox
              checked={row.getIsSelected()}
              onChange={(e) => {
                row.toggleSelected(!!e.target.checked);
              }}
              aria-label="Select row"
            />
          );
        },
        // Disable column sorting for this column
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ cell }) => {
          const category = cell.getValue();
          return <Chip label={category} size="small" color={"primary"} />;
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ cell }) => "$ " + cell.getValue(),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue()),
        enableColumnFilter: false,
      },
      {
        // Column for row actions
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const product = row.original;

          return <ProductRowActions product={product} />;
        },
      },
    ],
    []
  );

  return (
    <>
      <DataTableToolbar></DataTableToolbar>
      <ProductsTable products={products} columns={columns}></ProductsTable>
    </>
  );
};

export default ProductTableShell;
