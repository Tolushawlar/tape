"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "../SortableHeader";

export const productColumns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <div className="flex items-center">
        <Image
          src="/placeholder.svg"
          alt={row.getValue("name")}
          width={40}
          height={40}
          className="w-8 h-8 mr-2 rounded"
        />
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          {row.original.additionalProducts && (
            <div className="text-sm text-muted-foreground">
              +{row.original.additionalProducts} other products
            </div>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <SortableHeader column={column} title="SKU" />,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <SortableHeader column={column} title="Category" />,
    filterFn: (row, id, value) => {
      if (Array.isArray(value)) {
        return value.includes(row.getValue(id));
      }
      return true; // No filter applied if value is not an array
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <SortableHeader column={column} title="Stock" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableHeader column={column} title="Amount" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "Published"
              ? "bg-green-100 text-green-800"
              : status === "Draft"
              ? "bg-gray-100 text-gray-800"
              : status === "Low Stock"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => (
      <SortableHeader column={column} title="Date Added" />
    ),
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return new Date(date).toLocaleDateString();
    },
    filterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId) as string | number;
      if (!rowValue || !filterValue) return true;

      const rowDate = new Date(rowValue);
      const { startDate, endDate } = filterValue;

      // Ensure both startDate and endDate are valid Dates
      return rowDate >= new Date(startDate) && rowDate <= new Date(endDate);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() =>
              (window.location.href = `/admin/dashboard/products/${product.id}/edit`)
            }
          >
            <Eye />
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
