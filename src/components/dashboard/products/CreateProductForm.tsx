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
import { useEffect } from "react";

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.string().min(1, "Price is required"),
    color: z.string().min(1, "Color is required"),
    size: z.string().min(1, "Size is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string(),
    productDetails: z.string(),
    sizeFit: z.string(),
    lookAtMe: z.string(),
    about: z.string(),
    stock: z.string().min(1, "Stock is required"),
    main: z.string().min(1, "Main image URL is required"),
    other: z.string(),
});


// {
//     "name": "string",
//     "description": "string",
//     "price": 0,
//     "size": "string",
//     "color": "string",
//     "category": "string",
//     "brand": "string",
//     "stock": 0,
//     "productDetails": "string",
//     "sizeFit": "string",
//     "lookAtMe": "string",
//     "about": "string",
//     "image": {
//       "access": "public",
//       "path": "string",
//       "name": "string",
//       "type": "string",
//       "size": 0,
//       "mime": "string",
//       "meta": {}
//     },
//     "image2": {
//       "access": "public",
//       "path": "string",
//       "name": "string",
//       "type": "string",
//       "size": 0,
//       "mime": "string",
//       "meta": {}
//     }
//   }
type ProductFormData = z.infer<typeof productSchema>;

const categories = ["Men", "Women", "Kids", "Accessories"];
const availableSizes = ["XS", "S", "M", "L", "XL"];
const availableColors = ["Red", "Blue", "Black", "White", "Green"];

export function CreateProductForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            description: "",
            productDetails: "",
            sizeFit: "",
            lookAtMe: "",
            about: "",
            other: "",
        }
    });

    useEffect(() => {
        register("category", { required: "Category is required" });
        register("color", { required: "Color is required" });
        register("size", { required: "Size is required" });
    }, [register]);

    const handleCategoryChange = (value: string) => {
        setValue("category", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const handleColorChange = (value: string) => {
        setValue("color", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const handleSizeChange = (value: string) => {
        setValue("size", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const onSubmit = async (data: ProductFormData) => {
        try {
            // const productData = {
            //     name: data.name,
            //     price: parseFloat(data.price),
            //     color: data.color,
            //     size: data.size,
            //     category: data.category,
            //     subcategory: "item",
            //     description: data.description || "",
            //     (data.productDetails: data.productDetails || "",
            //     sizeFit: data.sizeFit || "",
            //     lookAtMe: data.lookAtMe || "",
            //     about: data.about || "",
            //     stock: parseIntstock, 10),
            //     images: {
            //         main: data.main,
            //         others: data.other,
            //     },
            // };

            const productData = {
                name: data.name,
                price: parseFloat(data.price),
                color: data.color,
                size: data.size,
                category: data.category,
                description: data.description || "",
                brand: "string",
                productDetails: data.productDetails || "",
                sizeFit: data.sizeFit || "",
                lookAtMe: data.lookAtMe || "",
                about: data.about || "",
                stock: data.stock ||  10,
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
                }
            };

            const response = await axios.post(
                // "https://tapebackend.onrender.com/api/products",
                "https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product",
                productData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log(productData);
                alert("Product created successfully!");
                reset();
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Create New Product</h1>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Product"}
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
                        <Select onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category && (
                            <span className="text-red-500 text-sm">{errors.category.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="color">Color</Label>
                        <Select onValueChange={handleColorChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableColors.map((color) => (
                                    <SelectItem key={color} value={color.toLowerCase()}>
                                        {color}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.color && (
                            <span className="text-red-500 text-sm">{errors.color.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="size">Size</Label>
                        <Select onValueChange={handleSizeChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableSizes.map((size) => (
                                    <SelectItem key={size} value={size.toLowerCase()}>
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.size && (
                            <span className="text-red-500 text-sm">{errors.size.message}</span>
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
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            rows={3}
                        />
                    </div>

                    <div>
                        <Label htmlFor="productDetails">Product Details</Label>
                        <Textarea
                            id="productDetails"
                            {...register("productDetails")}
                            rows={3}
                        />
                    </div>

                    <div>
                        <Label htmlFor="sizeFit">Size & Fit</Label>
                        <Textarea
                            id="sizeFit"
                            {...register("sizeFit")}
                            rows={3}
                        />
                    </div>

                    <div>
                        <Label htmlFor="lookAtMe">Look At Me</Label>
                        <Textarea
                            id="lookAtMe"
                            {...register("lookAtMe")}
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
}
