"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Product {
  id: number;
  name: string;
  price: number;
  image: {
    path: string;
  };
}

interface SearchProductProps {
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
}

const SearchProduct = ({ openSearch, setOpenSearch }: SearchProductProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearch(!openSearch);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [openSearch, setOpenSearch]);

  return (
    <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
      <Command>
        <CommandInput placeholder="Search products..." />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup heading="Products">
            {products.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => {
                  // Handle product selection
                  console.log(`Selected product: ${product.name}`);
                  setOpenSearch(false);
                }}
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.image.path}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SearchProduct;
