/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string(),
  product_details: z.string(),
  size_fit: z.string(),
  look_at_me: z.string(),
  about: z.string(),
  stock: z.string().min(1, "Stock is required"),
  main: z.string().min(1, "Main image URL is required"),
  other: z.string(),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductImage {
  access: "public";
  path: string;
  name: string;
  type: string;
  size: number;
  mime: string;
  meta: object;
}

interface ProductData {
  name: string;
  price: number;
  category: string;
  description: string;
  brand: string;
  product_details: string;
  size_fit: string;
  look_at_me: string;
  about: string;
  stock: number;
  image: ProductImage;
  image2: ProductImage;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  color5?: string;
  size1?: string;
  size2?: string;
  size3?: string;
  size4?: string;
  size5?: string;
  [key: `color${number}`]: string | undefined; // Index signature for color properties
  [key: `size${number}`]: string | undefined;  // Index signature for size properties
}

interface Category {
  id: number;
  category_name: string;
  created_at: string;
}

const ProductPage = () => {
  const pathname = usePathname();
  const productId = pathname.split('/').pop();
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      description: "",
      product_details: "",
      size_fit: "",
      look_at_me: "",
      about: "",
      other: "",
      colors: [],
      sizes: [],
    }
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          // "https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/category"
          "http://localhost:3001/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", productId);
        const response = await axios.get(
          // `https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product/${productId}`
          `http://localhost:3001/api/products/${productId}`
        );
        console.log("API Response:", response);
        const product = response.data;
        console.log("Product data:", product);

        if (!product) {
          throw new Error("No product data received");
        }

        setValue("name", product.name);
        setValue("price", product.price.toString());
        setValue("category", product.category);
        setValue("description", product.description);
        setValue("product_details", product.product_details);
        setValue("size_fit", product.size_fit);
        setValue("look_at_me", product.look_at_me);
        setValue("about", product.about);
        setValue("stock", product.stock.toString());
        setValue("main", product.image.path);
        setValue("other", product.image2.path);

        const initialColors = [
          product.color1,
          product.color2,
          product.color3,
          product.color4,
          product.color5,
        ].filter(Boolean) as string[];
        setColors(initialColors);
        setValue("colors", initialColors);

        const initialSizes = [
          product.size1,
          product.size2,
          product.size3,
          product.size4,
          product.size5,
        ].filter(Boolean) as string[];
        setSizes(initialSizes);
        setValue("sizes", initialSizes);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      console.log("Initiating product fetch for ID:", productId);
      fetchProduct();
    } else {
      console.log("No product ID available");
    }
  }, [productId, setValue]);

  const handleCategoryChange = (value: string) => {
    setValue("category", value, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const handleRemoveColor = (index: number) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors);
    setValue("colors", updatedColors);
  };

  const handleAddColor = () => {
    if (newColor && !colors.includes(newColor)) {
      const updatedColors = [...colors, newColor];
      setColors(updatedColors);
      setValue("colors", updatedColors);
      setNewColor("");
    }
  };

  const handleRemoveSize = (index: number) => {
    const updatedSizes = [...sizes];
    updatedSizes.splice(index, 1);
    setSizes(updatedSizes);
    setValue("sizes", updatedSizes);
  };

  const handleAddSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      const updatedSizes = [...sizes, newSize];
      setSizes(updatedSizes);
      setValue("sizes", updatedSizes);
      setNewSize("");
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const productData: ProductData = {
        name: data.name,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description || "",
        brand: "string",
        product_details: data.product_details || "",
        size_fit: data.size_fit || "",
        look_at_me: data.look_at_me || "",
        about: data.about || "",
        stock: parseInt(data.stock, 10) || 0,
        image: {
          "access": "public",
          "path": data.main,
          "name": "string",
          "type": "string",
          "size": 0,
          "mime": "string",
          "meta": {}
        },
        image2: {
          "access": "public",
          "path": data.other,
          "name": "string",
          "type": "string",
          "size": 0,
          "mime": "string",
          "meta": {}
        },
      };

      // Map colors to color1, color2, etc.
      data.colors.forEach((color, index) => {
        productData[`color${index + 1}`] = color;
      });
      // Add empty strings for any missing color fields
      for (let i = data.colors.length + 1; i <= 5; i++) {
        productData[`color${i}`] = "";
      }

      // Map sizes to size1, size2, etc.
      data.sizes.forEach((size, index) => {
        productData[`size${index + 1}`] = size;
      });
      // Add empty strings for any missing size fields
      for (let i = data.sizes.length + 1; i <= 5; i++) {
        productData[`size${i}`] = "";
      }

      const response = await axios.put(
        // `https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product/${productId}`,
        `http://localhost:3001/api/products/${productId}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Updated data:", productData);
        alert("Product updated successfully!");
        window.location.href = "/admin/dashboard/products";
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Product"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price")}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">{errors.price.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange} defaultValue={getValues("category")}>
              <SelectTrigger>
                <SelectValue placeholder={getValues("category") || "Select a category"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.category_name}
                  >
                    {cat.category_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <span className="text-red-500 text-sm">{errors.category.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock")}
            />
            {errors.stock && (
              <span className="text-red-500 text-sm">{errors.stock.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="main">Main Image URL</Label>
            <Input
              id="main"
              {...register("main")}
            />
            {errors.main && (
              <span className="text-red-500 text-sm">{errors.main.message}</span>
            )}
          </div>

          <div>
            <Label htmlFor="other">Other Images URL</Label>
            <Input
              id="other"
              {...register("other")}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Colors</Label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-1 border rounded-md p-1">
                  <span>{color}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                type="text"
                placeholder="Add new color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />
              <Button type="button" size="sm" onClick={handleAddColor}>
                <PlusCircledIcon className="w-4 h-4 mr-1" />
                Add Color
              </Button>
            </div>
          </div>

          <div>
            <Label>Sizes</Label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size, index) => (
                <div key={index} className="flex items-center space-x-1 border rounded-md p-1">
                  <span>{size}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                type="text"
                placeholder="Add new size"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
              />
              <Button type="button" size="sm" onClick={handleAddSize}>
                <PlusCircledIcon className="w-4 h-4 mr-1" />
                Add Size
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="product_details">Product Details</Label>
            <Textarea
              id="product_details"
              {...register("product_details")}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="size_fit">Size & Fit</Label>
            <Textarea
              id="size_fit"
              {...register("size_fit")}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="look_at_me">Look At Me</Label>
            <Textarea
              id="look_at_me"
              {...register("look_at_me")}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              {...register("about")}
              rows={3}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductPage;
