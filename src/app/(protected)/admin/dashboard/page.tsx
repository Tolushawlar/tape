"use client";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  Package,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/types";
import { StatCard } from "@/components/dashboard/StatsCard";

const recentOrders: Order[] = [
  {
    id: 1,
    product: "Oversize T-shirt",
    additionalProducts: 3,
    customer: "John Bushmill",
    email: "johnb@mail.com",
    total: "£55,000",
    status: "Processing",
  },
  {
    id: 2,
    product: "Oversize T-shirt",
    additionalProducts: 1,
    customer: "Ilham Budi Agung",
    email: "ilhambudi@mail.com",
    total: "£75,000",
    status: "Processing",
  },
  {
    id: 3,
    product: "Oversize T-shirt",
    customer: "Mohammad Karim",
    email: "m_karim@mail.com",
    total: "£64,000",
    status: "Shipped",
  },
  {
    id: 4,
    product: "Oversize T-shirt",
    additionalProducts: 1,
    customer: "Linda Blair",
    email: "lindablair@mail.com",
    total: "£85,000",
    status: "Shipped",
  },
  {
    id: 5,
    product: "Oversize T-shirt",
    customer: "Josh Adam",
    email: "josh_adam@mail.com",
    total: "£25,000",
    status: "Delivered",
  },
];

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src="/placeholder.svg"
          alt={row.original.product}
          width={40}
          height={40}
          className="rounded"
        />
        <div>
          <p className="font-medium">{row.original.product}</p>
          {row.original.additionalProducts && (
            <p className="text-sm text-gray-500">
              +{row.original.additionalProducts} other products
            </p>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.customer}</p>
        <p className="text-sm text-gray-500">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs rounded ${
          row.original.status === "Processing"
            ? "bg-orange-100 text-orange-600"
            : row.original.status === "Shipped"
            ? "bg-blue-100 text-blue-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

const topProducts = [
  { name: "Oversize T-shirt", category: "Men", price: "£55,000" },
  { name: "Oversize T-shirt", category: "Men", price: "£55,000" },
  { name: "Oversize T-shirt", category: "Women", price: "£5,000" },
  { name: "Oversize T-shirt", category: "Women", price: "£55,000" },
  { name: "Oversize T-shirt", category: "Kids", price: "£55,000" },
  { name: "Oversize T-shirt", category: "Kids", price: "£95,000" },
  { name: "Oversize T-shirt", category: "Accessories", price: "£67,000" },
  { name: "Oversize T-shirt", category: "Accessories", price: "£999" },
];

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1);
  const table = useReactTable({
    data: recentOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8"
    >
      {/* <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold">
          WELCOME BACK, ADESHILE
        </h2>
        <p className="text-gray-500">
          welcome back jay
        </p>
      </div> */}

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
      >
        <StatCard
          icon={<Package />}
          title="Total Revenue"
          value="£25,75,500"
          color="bg-[#1a1f37]"
        />
        <StatCard
          icon={<ShoppingCart />}
          title="Total Order"
          value="31,500"
          color="bg-red-600"
        />
        <StatCard
          icon={<Users2 />}
          title="Total Customer"
          value="24,500"
          color="bg-blue-900"
        />
        <StatCard
          icon={<Package />}
          title="Total Product"
          value="62,470"
          color="bg-gray-400"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-lg shadow"
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded">
                  +2 Orders
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Input type="date" className="w-full sm:w-40" />
                <Select>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Filters" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">See All</Button>
              </div>
            </div>

            <div className="overflow-x-auto">
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

            <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-4 gap-4">
              <p className="text-sm text-gray-500">Showing 1-5 from 100</p>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {[1, 2, 3].map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    className="w-8 h-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
                  disabled={currentPage === 3}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Top Product</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View All</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Top Product in This New Month
            </p>
            <div className="space-y-6">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Image
                    src="/placeholder.svg"
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <p className="font-medium">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
