"use client";

import { Eye, MoreHorizontal, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  id: string;
  name: string;
  additionalProducts?: number;
  sku: string;
  category: string;
  stock: number;
  amount: string;
  status: "Published" | "Draft" | "Low Stock" | "Out of Stock";
  dateAdded: string;
};

const products: Product[] = [
  {
    id: "302012",
    name: "Oversize T-shirt",
    additionalProducts: 3,
    sku: "302012",
    category: "Men",
    stock: 10,
    amount: "£55,000",
    status: "Low Stock",
    dateAdded: "29 Dec 2024",
  },
  {
    id: "302011",
    name: "Oversize T-shirt",
    additionalProducts: 1,
    sku: "302011",
    category: "Women",
    stock: 204,
    amount: "£75,000",
    status: "Published",
    dateAdded: "24 Dec 2024",
  },
  {
    id: "302002",
    name: "Oversize T-shirt",
    sku: "302002",
    category: "Kids",
    stock: 48,
    amount: "£64,000",
    status: "Draft",
    dateAdded: "12 Dec 2024",
  },
  {
    id: "301901",
    name: "Oversize T-shirt",
    additionalProducts: 1,
    sku: "301901",
    category: "Accessories",
    stock: 401,
    amount: "£85,000",
    status: "Published",
    dateAdded: "21 Oct 2024",
  },
  {
    id: "301900",
    name: "Oversize T-shirt",
    sku: "301900",
    category: "Accessories",
    stock: 120,
    amount: "£25,000",
    status: "Published",
    dateAdded: "21 Oct 2024",
  },
];

export default function ProductsPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns: ColumnDef<Product>[] = [
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
      header: "Product",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image
            src="/placeholder.svg"
            alt={row.original.name}
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{row.original.name}</p>
            {row.original.additionalProducts && (
              <p className="text-sm text-muted-foreground">
                +{row.original.additionalProducts} other products
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.stock}</div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.amount}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            className={
              status === "Published"
                ? "bg-green-100 text-green-600 hover:bg-green-100"
                : status === "Draft"
                ? "bg-gray-100 text-gray-600 hover:bg-gray-100"
                : status === "Low Stock"
                ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                : "bg-red-100 text-red-600 hover:bg-red-100"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "dateAdded",
      header: "Date Added",
    },
    {
      id: "actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>View product</DropdownMenuItem>
              <DropdownMenuItem>Edit product</DropdownMenuItem>
              <DropdownMenuItem>Delete product</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4 md:p-8 pt-6"
    >
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your products
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={
              !columnFilters.find((filter) => filter.id === "status")
                ? "default"
                : "outline"
            }
            onClick={() => table.getColumn("status")?.setFilterValue(undefined)}
          >
            All Product
          </Button>
          <Button
            variant={
              columnFilters.find(
                (filter) =>
                  filter.id === "status" && filter.value === "Published"
              )
                ? "default"
                : "outline"
            }
            onClick={() =>
              table.getColumn("status")?.setFilterValue("Published")
            }
          >
            Published
          </Button>
          <Button
            variant={
              columnFilters.find(
                (filter) =>
                  filter.id === "status" && filter.value === "Low Stock"
              )
                ? "default"
                : "outline"
            }
            onClick={() =>
              table.getColumn("status")?.setFilterValue("Low Stock")
            }
          >
            Low Stock
          </Button>
          <Button
            variant={
              columnFilters.find(
                (filter) => filter.id === "status" && filter.value === "Draft"
              )
                ? "default"
                : "outline"
            }
            onClick={() => table.getColumn("status")?.setFilterValue("Draft")}
          >
            Draft
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-8"
            />
          </div>

          <div className="flex items-center gap-4">
            <Input type="date" className="w-full sm:w-[130px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Filters
                  <MoreHorizontal className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Category</DropdownMenuItem>
                <DropdownMenuItem>Stock</DropdownMenuItem>
                <DropdownMenuItem>Price Range</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border overflow-x-auto w-full outline outline-red-500">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
