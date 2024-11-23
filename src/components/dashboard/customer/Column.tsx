"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "../SortableHeader";

import { Customer } from "@/constants/customers";
import { StatusStyles } from "../orders/Column";

export const customersColumns: ColumnDef<Customer>[] = [
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
    header: ({ column }) => <SortableHeader column={column} title="Customer" />,
    cell: ({ row }) => (
      <div className="flex items-center">
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.email}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableHeader column={column} title="Amount" />,
    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          ${row.original.amount.toLocaleString()}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "orders",
    header: ({ column }) => <SortableHeader column={column} title="Orders" />,
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
    accessorKey: "lastPurchased",
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Purchase" />
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
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      // Map status to appropriate colors
      const statusStyles: StatusStyles = {
        Active: "bg-green-100 text-green-800",
        Blocked: "bg-red-100 text-red-800",
      };

      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusStyles[status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("Edit", product.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete", product.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
