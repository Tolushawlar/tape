export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  qtySold: number;
  stock: number;
  dateAdded: string;
};

export const productCategories: ProductCategory[] = [
  {
    id: "1",
    name: "Men",
    description: "Range of men's clothing",
    qtySold: 1200,
    stock: 450,
    dateAdded: "2024-10-15",
  },
  {
    id: "2",
    name: "Women",
    description: "Range of women's dresses",
    qtySold: 1800,
    stock: 600,
    dateAdded: "2024-09-10",
  },
  {
    id: "3",
    name: "Kids",
    description: "Range of kids clothes",
    qtySold: 950,
    stock: 300,
    dateAdded: "2024-08-05",
  },
  {
    id: "4",
    name: "Accessories",
    description: "Range of accessories",
    qtySold: 700,
    stock: 200,
    dateAdded: "2024-07-20",
  },
];
