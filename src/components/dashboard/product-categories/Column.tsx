"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "../SortableHeader";
import { ProductCategory } from "@/constants/productCategories";
import Image from "next/image";

// Mock data for categories
const mockCategories = [
  {
    id: 1,
    created_at: 1744276668265,
    category_name: "",
    description: "All men products"
  }
];

// Fetch categories from mock data
const fetchCategories = async () => {
  return mockCategories;
};

export const productCategoriesColumns: ColumnDef<ProductCategory>[] = [
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
    accessorKey: "category_name",
    header: ({ column }) => <SortableHeader column={column} title="Categories" />,
    cell: ({ row }) => (
      <div className="flex items-center">
        {/* <Image
          src="/placeholder.svg"
          alt={row.getValue("name")}
          width={40}
          height={40}
          className="w-8 h-8 mr-2 rounded"
        /> */}
        <div>
          <div className="font-medium">{row.getValue("category_name")}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.description}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "created_at",
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
      const category = row.original;

      return (
        <div className="flex items-center gap-2">
          {/* <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() =>
              (window.location.href = `/admin/dashboard/product-categories/${category.id}/edit`)
            }
          >
            <Eye />
          </Button> */}
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={async () => {
              try {
                // Delete category from database
                // await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/category/${category.id}`, {
                await fetch(`http://localhost:3001/api/categories/${category.id}`, {
                  method: 'DELETE',
                });
                // Refresh data after deletion
                window.location.reload();
              } catch (error) {
                console.error('Error deleting category:', error);
              }
            }}
          >
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
