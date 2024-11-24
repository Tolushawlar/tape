"use client";

import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

const customerData = {
  status: "Active",
  name: "Wisdom Johnson",
  email: "wisdom@****.com",
  phone: "+234 913 212 1191",
  address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
  country: "Nigeria",
  dateAdded: "12 Dec 2024",
  lastPurchase: "12 Dec 2024",
  amountSpent: "£85,000",
  orders: [
    {
      product: "Oversize T-shirt",
      additionalProducts: 1,
      sku: "301901",
      date: "12 Dec 2024",
      price: "£75,000",
      total: "£75,000",
    },
    {
      product: "Oversize T-shirt",
      additionalProducts: 1,
      sku: "302011",
      date: "12 Dec 2024",
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function CustomerDetails() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#1a1f37] text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-16 flex items-center">
            <Link href="/customers" className="hover:opacity-80">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-lg font-medium ml-4">Customer Details</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white rounded-lg shadow-sm"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Customer Profile</h2>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 hover:bg-green-100"
              >
                {customerData.status}
              </Badge>
            </div>

            <motion.div
              variants={container}
              className="grid gap-6 md:grid-cols-2"
            >
              <motion.div
                variants={item}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Customer Name</div>
                  <div className="font-medium">{customerData.name}</div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{customerData.email}</div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">{customerData.phone}</div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-medium">{customerData.address}</div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Country</div>
                  <div className="font-medium">{customerData.country}</div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date Added</div>
                  <div className="font-medium">{customerData.dateAdded}</div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Last Purchase</div>
                  <div className="font-medium">{customerData.lastPurchase}</div>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Wallet className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Amount Spent</div>
                  <div className="font-medium">{customerData.amountSpent}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
                    Date
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
                {customerData.orders.map((order) => (
                  <tr key={order.sku}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Image
                          src="/placeholder.svg"
                          alt={order.product}
                          width={100}
                          height={100}
                          className="w-10 h-10 rounded mr-3"
                        />
                        <div>
                          <div className="font-medium">{order.product}</div>
                          {order.additionalProducts > 0 && (
                            <div className="text-sm text-gray-500">
                              +{order.additionalProducts} other products
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.sku}</td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-gray-500">{order.price}</td>
                    <td className="px-6 py-4 text-right font-medium">
                      {order.total}
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
                    {customerData.summary.subtotal}
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
                    {customerData.summary.vat}
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
                    {customerData.summary.shipping}
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
                    {customerData.summary.total}
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
