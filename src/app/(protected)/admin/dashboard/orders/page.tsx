"use client";

import { Search } from "lucide-react";
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
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/dashboard/DatePicker";
import { orders } from "@/constants/orders";
import { orderColumns } from "@/components/dashboard/orders/Column";

export default function OrdersPage() {
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

  const table = useReactTable({
    data: orders,
    columns: orderColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
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

      table.getColumn("dateCreated")?.setFilterValue({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    } else {
      table.getColumn("dateCreated")?.setFilterValue(undefined);
    }
  }, [dateRange, table]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4 md:p-8 pt-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of your orders
        </p>
      </div>
      <div className="flex items-center justify-between space-y-2"></div>
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">All Status</TabsTrigger>
            <TabsTrigger value="Processing">Processing</TabsTrigger>
            <TabsTrigger value="Shipped">Shipped</TabsTrigger>
            <TabsTrigger value="Delivered">Delivered</TabsTrigger>
            <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={resetAllFilters}
        >
          Reset All Filters
        </Button>
      </div>

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

        <div className="flex items-center justify-end space-x-2">
          <DatePickerWithRange
            date={dateRange}
            setDate={setDateRange}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
          />
        </div>

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
                    colSpan={orderColumns.length}
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
