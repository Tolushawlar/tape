/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
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
    price: z.string().min(1, "Price is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Price must be a valid positive number"),
    color: z.string().min(1, "Color is required"),
    size: z.string().min(1, "Size is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    productDetails: z.string().min(1, "Product details are required"),
    sizeFit: z.string().min(1, "Size & Fit information is required"),
    lookAtMe: z.string().min(1, "Look At Me section is required"),
    about: z.string().min(1, "About section is required"),
    stock: z.string().min(1, "Stock is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Stock must be a valid non-negative number"),
    main: z.string().min(1, "Main image URL is required")
        .url("Must be a valid URL"),
    other: z.string()
        .refine(val => !val || val.split(',').every(url => url.trim().startsWith('http')),
            "All URLs must be valid"),
});

type ProductFormData = z.infer<typeof productSchema>;

const categories = ["Men", "Women", "Kids", "Accessories"];
const availableSizes = ["XS", "S", "M", "L", "XL"];
const availableColors = ["Red", "Blue", "Black", "White", "Green"];

interface UpdateProductFormProps {
    productId: string;
    initialData: any; // Replace 'any' with your product type
}

export function UpdateProductForm({ productId, initialData }: UpdateProductFormProps) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        mode: "onChange",
        defaultValues: {
            name: initialData.name || "",
            price: initialData.price?.toString() || "",
            color: initialData.color || "",
            size: initialData.size || "",
            category: initialData.category || "",
            description: initialData.description || "",
            productDetails: initialData.productDetails || "",
            sizeFit: initialData.sizeFit || "",
            lookAtMe: initialData.lookAtMe || "",
            about: initialData.about || "",
            stock: initialData.stock?.toString() || "",
            main: initialData.images?.main || "",
            other: initialData.images?.others?.join(", ") || "",
        }
    });

    useEffect(() => {
        register("category", { required: "Category is required" });
        register("color", { required: "Color is required" });
        register("size", { required: "Size is required" });

        // Set initial values for select fields
        setValue("category", initialData.category);
        setValue("color", initialData.color);
        setValue("size", initialData.size);
    }, [register, setValue, initialData]);

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
            const productData = {
                name: data.name.trim(),
                price: Number(data.price),
                color: data.color.toLowerCase(),
                size: data.size.toLowerCase(),
                category: data.category.toLowerCase(),
                subcategory: "item",
                description: data.description.trim(),
                productDetails: data.productDetails.trim(),
                sizeFit: data.sizeFit.trim(),
                lookAtMe: data.lookAtMe.trim(),
                about: data.about.trim(),
                stock: Number(data.stock),
                images: {
                    main: data.main.trim(),
                    others: data.other ? data.other.split(',').map(url => url.trim()) : [],
                },
            };

            const response = await axios.put(
                `https://tapebackend.onrender.com/api/products/${productId}`,
                productData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert("Product updated successfully!");
                router.push('/dashboard/products');
            }
        } catch (error: any) {
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            alert(
                `Failed to update product: ${error.response?.data?.message ||
                error.message ||
                "Unknown error occurred"
                }`
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Update Product</h1>
                    <div className="space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/dashboard/products')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className={!isValid ? "opacity-50 cursor-not-allowed" : ""}
                        >
                            {isSubmitting ? "Updating..." : "Update Product"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                            id="name"
                            placeholder="Enter product name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="price">Price *</Label>
                        <Input
                            id="price"
                            type="number"
                            step="0.01"
                            placeholder="Enter price"
                            {...register("price")}
                        />
                        {errors.price && (
                            <span className="text-red-500 text-sm">{errors.price.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                            onValueChange={handleCategoryChange}
                            defaultValue={initialData.category}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category.toLowerCase()}>
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
                        <Label htmlFor="color">Color *</Label>
                        <Select
                            onValueChange={handleColorChange}
                            defaultValue={initialData.color}
                        >
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
                        <Label htmlFor="size">Size *</Label>
                        <Select
                            onValueChange={handleSizeChange}
                            defaultValue={initialData.size}
                        >
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
                        <Label htmlFor="stock">Stock *</Label>
                        <Input
                            id="stock"
                            type="number"
                            placeholder="Enter stock quantity"
                            {...register("stock")}
                        />
                        {errors.stock && (
                            <span className="text-red-500 text-sm">{errors.stock.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="main">Main Image URL *</Label>
                        <Input
                            id="main"
                            placeholder="Enter main image URL"
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
                            placeholder="Enter URLs separated by commas"
                            {...register("other")}
                        />
                        <span className="text-sm text-gray-500">
                            Optional: Separate multiple URLs with commas
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter product description"
                            {...register("description")}
                            rows={3}
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm">{errors.description.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="productDetails">Product Details *</Label>
                        <Textarea
                            id="productDetails"
                            placeholder="Enter product details"
                            {...register("productDetails")}
                            rows={3}
                        />
                        {errors.productDetails && (
                            <span className="text-red-500 text-sm">{errors.productDetails.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="sizeFit">Size & Fit *</Label>
                        <Textarea
                            id="sizeFit"
                            placeholder="Enter size and fit information"
                            {...register("sizeFit")}
                            rows={3}
                        />
                        {errors.sizeFit && (
                            <span className="text-red-500 text-sm">{errors.sizeFit.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="lookAtMe">Look At Me *</Label>
                        <Textarea
                            id="lookAtMe"
                            placeholder="Enter Look At Me section"
                            {...register("lookAtMe")}
                            rows={3}
                        />
                        {errors.lookAtMe && (
                            <span className="text-red-500 text-sm">{errors.lookAtMe.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="about">About *</Label>
                        <Textarea
                            id="about"
                            placeholder="Enter about section"
                            {...register("about")}
                            rows={3}
                        />
                        {errors.about && (
                            <span className="text-red-500 text-sm">{errors.about.message}</span>
                        )}
                    </div>
                </div>

                <div className="text-sm text-gray-500 mt-4">
                    * Required fields
                </div>
            </form>
        </div>
    );
}
