export type Product = {
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

export const products: Product[] = [
  {
    id: "302012",
    name: "Oversize T-shirt",
    additionalProducts: 3,
    sku: "302012",
    category: "Men",
    stock: 10,
    amount: "£55,000",
    status: "Low Stock",
    dateAdded: "2024-12-29",
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
    dateAdded: "2024-12-24",
  },
  {
    id: "302002",
    name: "Oversize T-shirt",
    sku: "302002",
    category: "Kids",
    stock: 48,
    amount: "£64,000",
    status: "Draft",
    dateAdded: "2024-12-12",
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
    dateAdded: "2024-10-21",
  },
  {
    id: "301900",
    name: "Oversize T-shirt",
    sku: "301900",
    category: "Accessories",
    stock: 120,
    amount: "£25,000",
    status: "Published",
    dateAdded: "2024-10-21",
  },
];
