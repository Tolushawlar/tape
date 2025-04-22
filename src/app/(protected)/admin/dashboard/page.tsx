/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
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
import { useEffect, useState } from "react";
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

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "product",
    header: "Order Date",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div>
          <p className="font-medium">{new Date(row.original.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => (
      <div>
        <p className="font-medium">{row.original.first_name} {row.original.last_name}</p>
        <p className="text-sm text-gray-500">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "Total",
    header: "Total",
    cell: ({ row }) => `€${row.original.Total}`
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs rounded ${row.original.status === "Processing"
          ? "bg-orange-100 text-orange-600"
          : row.original.status === "Shipped"
            ? "bg-blue-100 text-blue-600"
            : "bg-green-100 text-green-600"
          }`}
      >
        Delivered
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const [orderDetails, setOrderDetails] = useState<Order | null>(null);

      const handleDelete = async () => {
        try {
          const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/order/${row.original.id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            window.location.reload();
          }
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      };

      const handleView = async () => {
        try {
          const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/order/${row.original.id}`);
          if (response.ok) {
            const data = await response.json();
            setOrderDetails(data);
            setShowModal(true);
          }
        } catch (error) {
          console.error('Error viewing order:', error);
        }
      };

      return (
        <>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleView}>
              <Eye className="w-4 h-4" />
            </Button>
          </div>

          {showModal && orderDetails && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <Button variant="ghost" onClick={() => setShowModal(false)}>
                    ✕
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Shipping Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {orderDetails.first_name} {orderDetails.last_name}</p>
                      <p><span className="font-medium">Email:</span> {orderDetails.email}</p>
                      <p><span className="font-medium">Phone:</span> {orderDetails.phone_number}</p>
                      <p><span className="font-medium">Address:</span> {orderDetails.address}</p>
                      <p><span className="font-medium">City:</span> {orderDetails.city}</p>
                      <p><span className="font-medium">State:</span> {orderDetails.state}</p>
                      <p><span className="font-medium">Country:</span> {orderDetails.country}</p>
                      <p><span className="font-medium">Postal Code:</span> {orderDetails.postal_code}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Billing Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {orderDetails.billing_first_name} {orderDetails.billing_last_name}</p>
                      <p><span className="font-medium">Email:</span> {orderDetails.billing_email}</p>
                      <p><span className="font-medium">Phone:</span> {orderDetails.billing_phone_number}</p>
                      <p><span className="font-medium">Address:</span> {orderDetails.billing_address}</p>
                      <p><span className="font-medium">City:</span> {orderDetails.billing_city}</p>
                      <p><span className="font-medium">State:</span> {orderDetails.billing_state}</p>
                      <p><span className="font-medium">Country:</span> {orderDetails.billing_country}</p>
                      <p><span className="font-medium">Postal Code:</span> {orderDetails.billing_postal_code}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Order ID:</span> {orderDetails.id}</p>
                    <p><span className="font-medium">Order Date:</span> {new Date(orderDetails.created_at).toLocaleDateString()}</p>
                    <p><span className="font-medium">Quantity:</span> {orderDetails.quantity}</p>
                    <p><span className="font-medium">Total Amount:</span> €{orderDetails.Total}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {orderDetails.cart_items?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-md"
                            />
                          )}
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">€{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
];

type Product = {
  name: string;
  category: string;
  price: number;
  image: { path: string } | null;
};

export default function Component() {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/order');
      const data = await response.json();

      const sortedOrders = data
        .sort((a: Order, b: Order) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10);

      setRecentOrders(sortedOrders);

      const revenue = data.reduce((sum: number, order: Order) => {
        const orderTotal = typeof order.Total === 'string' ?
          parseFloat(order.Total.replace('£', '')) :
          Number(order.Total);
        return sum + (isNaN(orderTotal) ? 0 : orderTotal);
      }, 0);
      setTotalRevenue(Number(revenue.toFixed(2)));

      setTotalOrders(data.length);

      const uniqueEmails = new Set(data.filter((order: { email: unknown; }) => order.email).map((order: Order) => order.email));
      setTotalCustomers(uniqueEmails.size);

    } catch (error) {
      console.error('Error fetching orders:', error);
      setRecentOrders([]);
      setTotalRevenue(0);
      setTotalOrders(0);
      setTotalCustomers(0);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const table = useReactTable({
    data: recentOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchTopProducts = async () => {
    try {
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product');
      const data = await response.json();
      setTotalProducts(data.length);

      return data
        .sort((a: Product, b: Product) => b.price - a.price)
        .slice(0, 10);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchTopProducts();
      setTopProducts(products);
    };

    getProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
      >
        <StatCard
          icon={<Package />}
          title="Total Revenue"
          value={`£${totalRevenue.toString()}`}
          color="bg-[#1a1f37]"
        />
        <StatCard
          icon={<ShoppingCart />}
          title="Total Order"
          value={totalOrders.toString()}
          color="bg-red-600"
        />
        <StatCard
          icon={<Users2 />}
          title="Total Customer"
          value={totalCustomers.toString()}
          color="bg-blue-900"
        />
        <StatCard
          icon={<Package />}
          title="Total Product"
          value={totalProducts.toString()}
          color="bg-gray-400"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Top Product</h2>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Top Product in This New Month
            </p>
            <div className="space-y-6">
              {topProducts.map((product, index) => {
                if (!product.image || !product.image.path) {
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <p className="font-medium">{`£${product.price.toLocaleString()}`}</p>
                    </div>
                  );
                }

                return (
                  <div key={index} className="flex items-center gap-3">
                    <Image
                      src={product.image.path}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <p className="font-medium">{`£${product.price.toLocaleString()}`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
