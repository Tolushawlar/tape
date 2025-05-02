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

const MAX_COLORS = 5;
const MAX_SIZES = 5;

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.string().min(1, "Price is required"),
    colors: z.array(z.string()).min(1, "At least one color is required").max(MAX_COLORS, `Maximum ${MAX_COLORS} colors allowed`),
    sizes: z.array(z.string()).min(1, "At least one size is required").max(MAX_SIZES, `Maximum ${MAX_SIZES} sizes allowed`),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    productDetails: z.string().min(1, "Product details are required"),
    sizeFit: z.string().min(1, "Size & fit information is required"),
    lookAtMe: z.string().min(1, "Look at me section is required"),
    about: z.string().min(1, "About section is required"),
    stock: z.string().min(1, "Stock is required").regex(/^\d+$/, "Stock must be a number"),
    main: z.string().min(1, "Main image URL is required").url("Must be a valid URL"),
    other: z.string().url("Must be a valid URL").optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Category {
    _id: string;
    category_name: string;
}

export function CreateProductForm() {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
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
            colors: [],
            sizes: [],
        }
    });

    const [categories, setCategories] = useState<Category[]>([]);
    const [currentColors, setCurrentColors] = useState<string[]>([]);
    const [currentSizes, setCurrentSizes] = useState<string[]>([]);
    const newColorInput = watch("newColor");
    const newSizeInput = watch("newSize");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    "https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/category"
                );
                setCategories(response.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
                alert("Failed to fetch categories.");
                setCategories([]);
            }
        };

        fetchCategories();
        register("category", { required: "Category is required" });
    }, [register]);

    const handleCategoryChange = (value: string) => {
        setValue("category", value, {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const handleAddColor = () => {
        if (newColorInput && !currentColors.includes(newColorInput) && currentColors.length < MAX_COLORS) {
            setCurrentColors([...currentColors, newColorInput]);
            setValue("colors", [...currentColors, newColorInput], { shouldValidate: true, shouldDirty: true });
            setValue("newColor", "");
        } else if (currentColors.length >= MAX_COLORS) {
            alert(`You can add a maximum of ${MAX_COLORS} colors.`);
        }
    };

    const handleRemoveColor = (colorToRemove: string) => {
        const updatedColors = currentColors.filter(color => color !== colorToRemove);
        setCurrentColors(updatedColors);
        setValue("colors", updatedColors, { shouldValidate: true, shouldDirty: true });
    };

    const handleAddSize = () => {
        if (newSizeInput && !currentSizes.includes(newSizeInput) && currentSizes.length < MAX_SIZES) {
            setCurrentSizes([...currentSizes, newSizeInput]);
            setValue("sizes", [...currentSizes, newSizeInput], { shouldValidate: true, shouldDirty: true });
            setValue("newSize", "");
        } else if (currentSizes.length >= MAX_SIZES) {
            alert(`You can add a maximum of ${MAX_SIZES} sizes.`);
        }
    };

    const handleRemoveSize = (sizeToRemove: string) => {
        const updatedSizes = currentSizes.filter(size => size !== sizeToRemove);
        setCurrentSizes(updatedSizes);
        setValue("sizes", updatedSizes, { shouldValidate: true, shouldDirty: true });
    };

    const onSubmit = async (data: ProductFormData) => {
        try {
            const colorPayload = {};
            data.colors.forEach((color, index) => {
                // Dynamically create color1, color2, etc. fields
                colorPayload[`color${index + 1}`] = color;
            });

            const sizePayload = {};
            data.sizes.forEach((size, index) => {
                // Dynamically create size1, size2, etc. fields
                sizePayload[`size${index + 1}`] = size;
            });

            const productData = {
                name: data.name,
                price: parseFloat(data.price),
                ...colorPayload, // Spread the dynamically created color fields
                ...sizePayload, // Spread the dynamically created size fields
                category: data.category,
                description: data.description || "",
                brand: "string",
                productDetails: data.productDetails || "",
                sizeFit: data.sizeFit || "",
                lookAtMe: data.lookAtMe || "",
                about: data.about || "",
                stock: parseInt(data.stock, 10),
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
                    "path": data.other || "",
                    "name": "string",
                    "type": "string",
                    "size": 0,
                    "mime": "string",
                    "meta": {}
                }
            };

            const response = await axios.post(
                "https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/product",
                productData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("Product data sent:", productData);
                alert("Product created successfully!");
                reset();
                setCurrentColors([]);
                setCurrentSizes([]);
                setValue("colors", []);
                setValue("sizes", []);
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
                            <span className="text-red-500 text-sm">{errors.name?.message}</span>
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
                            <span className="text-red-500 text-sm">{errors.price?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {(categories || []).map((category) => (
                                    <SelectItem key={category._id} value={category.category_name}>
                                        {category.category_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.category && (
                            <span className="text-red-500 text-sm">{errors.category?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label>Colors (Max {MAX_COLORS})</Label>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Enter color"
                                value={watch("newColor")}
                                onChange={(e) => setValue("newColor", e.target.value)}
                            />
                            <Button type="button" size="sm" onClick={handleAddColor} disabled={currentColors.length >= MAX_COLORS}>
                                Add Color
                            </Button>
                        </div>
                        {currentColors.length > 0 && (
                            <div className="mt-2">
                                {currentColors.map(color => (
                                    <div key={color} className="inline-flex items-center mr-2 rounded-full bg-gray-200 px-3 py-0.5 text-sm text-gray-800">
                                        {color}
                                        <button
                                            type="button"
                                            className="ml-1 rounded-full hover:bg-gray-300"
                                            onClick={() => handleRemoveColor(color)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.colors && (
                            <span className="text-red-500 text-sm">{errors.colors?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label>Sizes (Max {MAX_SIZES})</Label>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Enter size"
                                value={watch("newSize")}
                                onChange={(e) => setValue("newSize", e.target.value)}
                            />
                            <Button type="button" size="sm" onClick={handleAddSize} disabled={currentSizes.length >= MAX_SIZES}>
                                Add Size
                            </Button>
                        </div>
                        {currentSizes.length > 0 && (
                            <div className="mt-2">
                                {currentSizes.map(size => (
                                    <div key={size} className="inline-flex items-center mr-2 rounded-full bg-gray-200 px-3 py-0.5 text-sm text-gray-800">
                                        {size}
                                        <button
                                            type="button"
                                            className="ml-1 rounded-full hover:bg-gray-300"
                                            onClick={() => handleRemoveSize(size)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {errors.sizes && (
                            <span className="text-red-500 text-sm">{errors.sizes?.message}</span>
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
                            <span className="text-red-500 text-sm">{errors.stock?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="main">Main Image URL</Label>
                        <Input
                            id="main"
                            {...register("main")}
                        />
                        {errors.main && (
                            <span className="text-red-500 text-sm">{errors.main?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="other">Other Images URL</Label>
                        <Input
                            id="other"
                            {...register("other")}
                        />
                        {errors.other && (
                            <span className="text-red-500 text-sm">{errors.other?.message}</span>
                        )}
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
                        {errors.description && (
                            <span className="text-red-500 text-sm">{errors.description?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="productDetails">Product Details</Label>
                        <Textarea
                            id="productDetails"
                            {...register("productDetails")}
                            rows={3}
                        />
                        {errors.productDetails && (
                            <span className="text-red-500 text-sm">{errors.productDetails?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="sizeFit">Size & Fit</Label>
                        <Textarea
                            id="sizeFit"
                            {...register("sizeFit")}
                            rows={3}
                        />
                        {errors.sizeFit && (
                            <span className="text-red-500 text-sm">{errors.sizeFit?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="lookAtMe">Look At Me</Label>
                        <Textarea
                            id="lookAtMe"
                            {...register("lookAtMe")}
                            rows={3}
                        />
                        {errors.lookAtMe && (
                            <span className="text-red-500 text-sm">{errors.lookAtMe?.message}</span>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="about">About</Label>
                        <Textarea
                            id="about"
                            {...register("about")}
                            rows={3}
                        />
                        {errors.about && (
                            <span className="text-red-500 text-sm">{errors.about?.message}</span>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}