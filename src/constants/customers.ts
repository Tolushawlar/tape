export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  amount: string;
  status: "Active" | "Blocked";
  dateAdded: string;
  lastPurchased: string;
};

export const customers: Customer[] = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: 15,
    amount: "1200.00",
    status: "Active",
    dateAdded: "2023-10-15",
    lastPurchased: "2024-11-21",
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    orders: 8,
    amount: "650.50",
    status: "Blocked",
    dateAdded: "2023-08-10",
    lastPurchased: "2024-06-18",
  },
  {
    id: "CUST003",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    orders: 20,
    amount: "2100.75",
    status: "Active",
    dateAdded: "2022-05-20",
    lastPurchased: "2024-11-22",
  },
  {
    id: "CUST004",
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    orders: 5,
    amount: "300.00",
    status: "Active",
    dateAdded: "2024-01-12",
    lastPurchased: "2024-11-18",
  },
  {
    id: "CUST005",
    name: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    orders: 12,
    amount: "875.00",
    status: "Blocked",
    dateAdded: "2023-03-25",
    lastPurchased: "2024-05-30",
  },
  {
    id: "CUST006",
    name: "David Lee",
    email: "david.lee@example.com",
    orders: 18,
    amount: "1575.20",
    status: "Active",
    dateAdded: "2022-11-02",
    lastPurchased: "2024-11-15",
  },
  {
    id: "CUST007",
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    orders: 7,
    amount: "520.30",
    status: "Blocked",
    dateAdded: "2024-02-18",
    lastPurchased: "2024-08-10",
  },
  {
    id: "CUST008",
    name: "William Anderson",
    email: "william.anderson@example.com",
    orders: 10,
    amount: "1020.50",
    status: "Active",
    dateAdded: "2023-09-14",
    lastPurchased: "2024-11-20",
  },
  {
    id: "CUST009",
    name: "Emma Davis",
    email: "emma.davis@example.com",
    orders: 3,
    amount: "275.00",
    status: "Blocked",
    dateAdded: "2024-04-10",
    lastPurchased: "2024-07-15",
  },
  {
    id: "CUST010",
    name: "Lucas Thomas",
    email: "lucas.thomas@example.com",
    orders: 25,
    amount: "3200.00",
    status: "Active",
    dateAdded: "2021-06-28",
    lastPurchased: "2024-11-23",
  },
];
