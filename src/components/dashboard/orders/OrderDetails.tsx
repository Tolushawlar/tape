"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Copy, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const orderDetails = {
  orderId: "302011",
  status: "Processing",
  date: "12 Dec 2024",
  customer: {
    name: "Wisdom Johnson",
    email: "wisdom@****.com",
    phone: "09132121191",
  },
  payment: "Visa",
  shipping: "Flat Shipping",
  documents: {
    invoice: "INV-32011",
    shipping: "SHP-2011REG",
  },
  addresses: {
    billing: "1633 Bel Meadow Drive, Fontana, California 92335, USA",
    shipping: "1633 Bel Meadow Drive, Fontana, California 92335, USA",
  },
  timeline: [
    {
      status: "Order Placed",
      date: "12/12/2022, 03:00",
      completed: true,
      description: "An order has been placed.",
    },
    {
      status: "Processing",
      date: "12/12/2022, 03:15",
      completed: true,
      description: "Tape Wear has processed your order.",
    },
    { status: "Packed", date: "DD/MM/YY, 00:00", completed: false },
    { status: "Shipping", date: "DD/MM/YY, 00:00", completed: false },
    { status: "Delivered", date: "DD/MM/YY, 00:00", completed: false },
  ],
  products: [
    {
      name: "Oversize T-shirt",
      additionalProducts: 1,
      sku: "301901",
      quantity: 1,
      price: "£75,000",
      total: "£75,000",
    },
    {
      name: "Oversize T-shirt",
      additionalProducts: 1,
      sku: "302011",
      quantity: 1,
      price: "£30,000",
      total: "£30,000",
    },
  ],
  summary: {
    subtotal: "£105,000",
    vat: "£0.00",
    shipping: "£10,000",
    total: "£115,000",
  },
};

export function OrderDetails() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#1a1f37] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard/orders" className="hover:opacity-80">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-lg font-medium">Order Details</h1>
            </div>
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Invoice
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                Order #{orderDetails.orderId}
              </h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                {orderDetails.status}
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <span className="w-40">Added</span>
                <span>{orderDetails.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-40">Payment Method</span>
                <span>{orderDetails.payment}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-40">Shipping Method</span>
                <span>{orderDetails.shipping}</span>
              </div>
            </div>
          </motion.div>

          {/* Customer Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white rounded-lg shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-6">Customer</h2>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <span className="w-40">Customer</span>
                <span>{orderDetails.customer.name}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-40">Email</span>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{orderDetails.customer.email}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-40">Phone</span>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{orderDetails.customer.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Document Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white rounded-lg shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-6">Document</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-gray-600">
                <span>Invoice</span>
                <div className="flex items-center space-x-2">
                  <span>{orderDetails.documents.invoice}</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Shipping</span>
                <div className="flex items-center space-x-2">
                  <span>{orderDetails.documents.shipping}</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-white rounded-lg shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-6">Address</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-sm text-gray-600">Billing Address</span>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">
                    {orderDetails.addresses.billing}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-sm text-gray-600">Shipping Address</span>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">
                    {orderDetails.addresses.shipping}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-white rounded-lg shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-6">Order Status</h2>
          <div className="space-y-8">
            {orderDetails.timeline.map((item, index) => (
              <div key={item.status} className="relative flex items-start">
                {index !== orderDetails.timeline.length - 1 && (
                  <div
                    className={`absolute left-[15px] top-[30px] w-[2px] h-[calc(100%+32px)] 
                      ${item.completed ? "bg-blue-600" : "bg-gray-200"}`}
                  />
                )}
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${
                      item.completed
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full 
                      ${item.completed ? "bg-blue-600" : "bg-gray-200"}`}
                  />
                </div>
                <div className="ml-4 space-y-1">
                  <div className="font-medium">{item.status}</div>
                  {item.description && (
                    <div className="text-sm text-gray-500">
                      {item.description}
                    </div>
                  )}
                  <div className="text-sm text-gray-400">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Order List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm"
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Order List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-y border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orderDetails.products.map((product) => (
                  <tr key={product.sku}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Image
                          src="/placeholder.svg"
                          alt={product.name}
                          width={50}
                          height={50}
                          className="w-10 h-10 rounded mr-3"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          {product.additionalProducts && (
                            <div className="text-sm text-gray-500">
                              +{product.additionalProducts} other products
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.sku}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {product.quantity} pcs
                    </td>
                    <td className="px-6 py-4 text-gray-500">{product.price}</td>
                    <td className="px-6 py-4 text-right font-medium">
                      {product.total}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr className="border-t border-gray-200">
                  <td
                    colSpan={4}
                    className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                  >
                    Subtotal
                  </td>
                  <td className="px-6 py-3 text-right font-medium">
                    {orderDetails.summary.subtotal}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                  >
                    VAT(0)%
                  </td>
                  <td className="px-6 py-3 text-right font-medium">
                    {orderDetails.summary.vat}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                  >
                    Shipping Rate
                  </td>
                  <td className="px-6 py-3 text-right font-medium">
                    {orderDetails.summary.shipping}
                  </td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td
                    colSpan={4}
                    className="px-6 py-3 text-right text-sm font-medium text-gray-500"
                  >
                    Total
                  </td>
                  <td className="px-6 py-3 text-right font-medium">
                    {orderDetails.summary.total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
