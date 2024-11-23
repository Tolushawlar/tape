export type Order = {
  id: string;
  name: string;
  additionalProducts?: number;
  customer: { name: string; email: string };
  amount: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  dateCreated: string;
  paymentChannel: string;
};

export const orders: Order[] = [
  {
    id: "ORD001",
    name: "Men's Leather Jacket",
    additionalProducts: 2,
    customer: { name: "John Doe", email: "john.doe@example.com" },
    amount: "120.00",
    status: "Processing",
    dateCreated: "2024-11-21",
    paymentChannel: "PayPal",
  },
  {
    id: "ORD002",
    name: "Women's Summer Dress",
    customer: { name: "Jane Smith", email: "jane.smith@example.com" },
    amount: "85.50",
    status: "Shipped",
    dateCreated: "2024-11-20",
    paymentChannel: "Stripe",
  },
  {
    id: "ORD003",
    name: "Kids' Sneakers",
    additionalProducts: 1,
    customer: { name: "Alice Johnson", email: "alice.johnson@example.com" },
    amount: "45.99",
    status: "Delivered",
    dateCreated: "2024-11-18",
    paymentChannel: "Credit Card",
  },
  {
    id: "ORD004",
    name: "Men's Formal Shoes",
    customer: { name: "Michael Brown", email: "michael.brown@example.com" },
    amount: "110.00",
    status: "Cancelled",
    dateCreated: "2024-11-19",
    paymentChannel: "Debit Card",
  },
  {
    id: "ORD005",
    name: "Women's Handbag",
    additionalProducts: 3,
    customer: { name: "Sophia Wilson", email: "sophia.wilson@example.com" },
    amount: "150.75",
    status: "Processing",
    dateCreated: "2024-11-22",
    paymentChannel: "PayPal",
  },
  {
    id: "ORD006",
    name: "Men's Casual T-Shirt",
    customer: { name: "David Lee", email: "david.lee@example.com" },
    amount: "25.99",
    status: "Shipped",
    dateCreated: "2024-11-20",
    paymentChannel: "Stripe",
  },
  {
    id: "ORD007",
    name: "Kids' School Backpack",
    additionalProducts: 1,
    customer: { name: "Emma Davis", email: "emma.davis@example.com" },
    amount: "35.49",
    status: "Delivered",
    dateCreated: "2024-11-18",
    paymentChannel: "Credit Card",
  },
  {
    id: "ORD008",
    name: "Women's Heeled Sandals",
    customer: { name: "Olivia Martinez", email: "olivia.martinez@example.com" },
    amount: "65.00",
    status: "Cancelled",
    dateCreated: "2024-11-19",
    paymentChannel: "Debit Card",
  },
  {
    id: "ORD009",
    name: "Men's Sports Watch",
    additionalProducts: 1,
    customer: {
      name: "William Anderson",
      email: "william.anderson@example.com",
    },
    amount: "199.99",
    status: "Processing",
    dateCreated: "2024-11-22",
    paymentChannel: "PayPal",
  },
  {
    id: "ORD010",
    name: "Kids' Winter Jacket",
    customer: { name: "Emily Thomas", email: "emily.thomas@example.com" },
    amount: "75.00",
    status: "Shipped",
    dateCreated: "2024-11-20",
    paymentChannel: "Stripe",
  },
];
