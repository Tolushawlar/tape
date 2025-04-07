"use client";

import { Filter, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/constants/products";
import { productColumns } from "@/components/dashboard/products/Column";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/dashboard/DatePicker";
import { useRouter } from "next/navigation";
import axios from "axios";

export interface Product {
  id: string;
  name: string;
  category: string;
  status: string;
  dateAdded: string;
  price: string;
  stock: number;
  // additionalProducts: string;
  // Add other properties that exist in the product object
}

export default function ProductsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const { push } = useRouter();

  const table = useReactTable({
    data: products,
    columns: productColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const resetAllFilters = () => {
    setStatusFilter("all");
    setDateRange(undefined);
    setCategoryFilter([]);
    table.getColumn("name")?.setFilterValue("");
  };

  useEffect(() => {
    if (statusFilter !== "all") {
      table.getColumn("status")?.setFilterValue(statusFilter);
    } else {
      table.getColumn("status")?.setFilterValue(undefined);
    }
  }, [statusFilter, table]);

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const startDate = dateRange.from;
      const endDate = dateRange.to;

      table.getColumn("dateAdded")?.setFilterValue({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    } else {
      table.getColumn("dateAdded")?.setFilterValue(undefined);
    }
  }, [dateRange, table]);

  useEffect(() => {
    if (categoryFilter.length > 0) {
      table.getColumn("category")?.setFilterValue(categoryFilter);
    } else {
      table.getColumn("category")?.setFilterValue(undefined);
    }
  }, [categoryFilter, table]);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://tapebackend.onrender.com/api/products"
  //       );
  //       setProducts(response.data);
  //       // console.log(response.data)
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          // "https://tapebackend.onrender.com/api/products"
          "https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product",
        );
        console.log(response.data)

        // Validate and ensure data is an array
        if (Array.isArray(response.data)) {
          setProducts(
            response.data.map((item) => ({
              id: item.id,
              name: item.name,
              category: item.category || "Unknown", // Handle missing category
              status: item.status || "Unavailable",
              dateAdded: item.created_at || new Date().toISOString(),
              price: item.price,
              stock: item.stock,
            }))
          );
        } else {
          console.error("Invalid product data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4 md:p-8 pt-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your products
        </p>
      </div>
      <div className="flex items-center justify-between space-y-2"></div>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            {/* <TabsTrigger value="Published">Published</TabsTrigger>
            <TabsTrigger value="Low Stock">Low Stock</TabsTrigger>
            <TabsTrigger value="Draft">Draft</TabsTrigger> */}
          </TabsList>
        </Tabs>

        <Button
          className="bg-blue-700"
          onClick={() => push("/admin/dashboard/products/add-product")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* <div>
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={resetAllFilters}
        >
          Reset All Filters
        </Button>
      </div> */}

      <div className="space-y-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-8 max-w-[400px]"
          />
        </div>

        {/* <div className="flex items-center justify-end space-x-2">
          <DatePickerWithRange
            date={dateRange}
            setDate={setDateRange}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
          />

          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px]" align="end">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Categories</h4>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={categoryFilter.includes(category)}
                      onCheckedChange={(checked) => {
                        setCategoryFilter((prev) =>
                          checked
                            ? [...prev, category]
                            : prev.filter((c) => c !== category)
                        );
                      }}
                    />
                    <label
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div> */}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
               {/* using the react table, the items is been passed and looped through in this section */}
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
                    colSpan={productColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            {/* <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    {" "}
                    {productColumns.map((column) => (
                      <TableCell key={column.id}>
                        {flexRender(column.cell, product[column.dataField])}{" "}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={productColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody> */}
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
