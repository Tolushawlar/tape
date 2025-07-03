"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2, Edit2 } from "lucide-react";
import Image from "next/image";

import { Checkbox } from "@/components/ui/checkbox";
// import { Product } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { SortableHeader } from "../SortableHeader";
import { Product } from "@/app/(protected)/admin/dashboard/products/page";
import { API_ENDPOINTS } from "@/lib/api";

export const productColumns: ColumnDef<Product>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => tab  le.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "image",
    header: ({ column }) => <SortableHeader column={column} title="Product Image" />,
    cell: ({ row }) => (
      <div className="flex items-center">
        <Image
          src={row.getValue("image")}
          alt="product"
          width={40}
          height={40}
          className="w-8 h-8 mr-2 rounded"
        />
        {/* <div>
          <div className="font-medium">{row.getValue("name")}</div>
          {row.original.additionalProducts && (
            <div className="text-sm text-muted-foreground">
              +{row.original.additionalProducts} other products
            </div>
          )}
        </div> */}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
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
    accessorKey: "price",
    header: ({ column }) => <SortableHeader column={column} title="Amount (£)" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium           bg-green-100 text-green-800"
        // className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        //   status === "Published"
        //     ? "bg-green-100 text-green-800"
        //     : status === "Draft"
        //     ? "bg-gray-100 text-gray-800"
        //     : status === "Low Stock"
        //     ? "bg-yellow-100 text-yellow-800"
        //     : "bg-red-100 text-red-800"
        // }`}
        >
          Published
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
      const dateObj = new Date(date);

      // Format the date components
      const day = dateObj.getDate();
      const month = dateObj.toLocaleString('en-US', { month: 'short' });
      const year = dateObj.getFullYear();

      // Combine in desired format
      return `${day}, ${month}, ${year}`;
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
        <div className="flex items-center">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() =>
              (window.location.href = `/admin/dashboard/products/${product.id}/`)}
          >
            <Edit2 />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions2",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center ">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={async () => {
              if (confirm('Are you sure you want to delete this product?')) {
                try {
                  // const response = await fetch(`http://localhost:3001/api/products/${row.original.id}`, {
                  const response = await fetch(`${API_ENDPOINTS.products}/${row.original.id}`, {
                    method: 'DELETE',
                  });
                  if (response.ok) {
                    window.location.reload();
                  } else {
                    alert('Failed to delete product');
                  }
                } catch (error) {
                  console.error('Error deleting product:', error);
                  alert('Error deleting product');
                }
              }
            }}>
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
