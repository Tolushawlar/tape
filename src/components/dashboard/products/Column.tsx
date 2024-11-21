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
import { Product } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "../SortableHeader";
import Image from "next/image";

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
