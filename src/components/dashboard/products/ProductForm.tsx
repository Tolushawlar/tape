"use client";

import { motion } from "framer-motion";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Plus, Minus, Trash2 } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { useCallback, useState } from "react";
import { TagInputField } from "@/components/ui/input-with-tags";
import { Card, CardContent } from "@/components/ui/card";
import { containerVariants, fadeIn, sectionVariants } from "@/utils";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ProductDto, productSchema } from "@/schema/product";
import axios from "axios";

const categories = ["Men", "Women", "Kids", "Accessories"];
const discountTypes = ["Percentage", "Fixed Amount"];
const taxClasses = ["Standard", "Reduced", "Zero"];
const variationTypes = ["Size", "Color", "Material", "Style"];
const availableSizes = ["XS", "S", "M", "L", "XL"];
const availableColors = ["Red", "Blue", "Black", "White", "Green"];

export function AddProductForm() {
  const [images, setImages] = useState<{ main: File | null; others: File[] }>({
    main: null,
    others: [],
  });

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // const {
  //   register,
  //   control,
  //   handleSubmit,
  //   watch,
  //   setValue,
  //   formState: { errors },
  // } = useForm<ProductDto>({
  //   resolver: zodResolver(productSchema),
  //   defaultValues: {
  //     name: "",
  //     basePrice: 0,
  //     color: "",
  //     size: "",
  //     category: "",
  //     description: "",
  //     productDetails: "",
  //     sizeAndFit: "",
  //     lookAfterMe: "",
  //     aboutMe: "",
  //     quantity: 0,
  //   },
  // });

  // Function to handle size selection
const handleSizeChange = (size: string) => {
  setSelectedSize(size);
  setValue("size", size); // Update the form field
};

// Function to handle color selection
const handleColorChange = (color: string) => {
  setSelectedColor(color);
  setValue("color", color); // Update the form field
};
  

  const onDrop = (acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;

    setImages((prevImages) => {
      const newMain = prevImages.main || acceptedFiles[0]; // Set first image as main if not set
      const newOthers = prevImages.main
        ? [...prevImages.others, ...acceptedFiles]
        : acceptedFiles.slice(1);

      return { main: newMain, others: newOthers };
    });
  };

  const handleSubmitForm = async (data: ProductDto) => {
  console.log("clicked submit");
     event?.preventDefault(); // Prevent default form submission
     console.log("Form submission triggered with data:", data);
    const formData = new FormData();

    if (images.main) formData.append("main", images.main);
    images.others.forEach((file, index) =>
      formData.append(`others[${index}]`, file)
    );

    formData.append("name", data.name);
    formData.append("basePrice", String(data.basePrice));
    formData.append("color", data.color);
    formData.append("size", data.size);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("productDetails", data.productDetails);
    formData.append("sizeAndFit", data.sizeAndFit);
    formData.append("lookAfterMe", data.lookAfterMe);
    formData.append("aboutMe", data.aboutMe);
    formData.append("quantity", String(data.quantity));

    console.log("Submitting FormData:", Object.fromEntries(formData.entries()));

    try {
      const response = await fetch(
        "https://tapebackend.onrender.com/api/products",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload product");

      console.log("Product uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  // const onSubmit = (data: ProductDto) => {
  //   console.log("working");
  //   console.log("Form data:", data);
  // };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Handle image uploads if necessary
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("aboutMe", data.aboutMe);
      formData.append("productDetails", data.productDetails);
      formData.append("sizeAndFit", data.sizeAndFit);
      formData.append("lookAfterMe", data.lookAfterMe);
      formData.append("category", data.category);
      formData.append("basePrice", data.basePrice);
      formData.append("size", data.size);
      formData.append("color", data.color);
      formData.append("quantity", data.quantity);

      // Add images if available
      if (data.images?.main) {
        formData.append("mainImage", data.images.main);
      }
      if (data.images?.others?.length) {
        data.images.others.forEach((file: File, index: number) => {
          formData.append(`otherImages[${index}]`, file);
        });
      }

      // API request
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Product created successfully!");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    }
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  // const status = watch("status");

  return (
    <motion.section
      className="container mx-auto p-6 max-w-5xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      

      <form id="prodcutForm" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Add Products</h1>
      
        </div>
        <Button type="submit">
          Save Product
        </Button>
      </div>
        <motion.section
          className="bg-blue-50/50 p-6 rounded-lg"
          variants={sectionVariants}
        >
          <h2 className="text-lg font-semibold mb-4">General Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                placeholder="Type product name here..."
                {...register("name")}
                className="mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Product Description</Label>
              <Textarea
                id="description"
                placeholder="This is the description of the product. It gives a brief overview of the product features and benefits...."
                {...register("description")}
                className="mt-1 min-h-[100px]"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="aboutMe">About Product </Label>
              <Textarea
                id="aboutMe"
                placeholder="Information about the brand or the product’s origin and background..."
                {...register("aboutMe")}
                className="mt-1 min-h-[100px]"
              />
              {errors.aboutMe && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.aboutMe.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="productDetails">Product Details</Label>
              <Textarea
                id="productDetails"
                placeholder="These are the details about the product including specifications and technical details..."
                {...register("productDetails")}
                className="mt-1 min-h-[100px]"
              />
              {errors.productDetails && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productDetails.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="sizeAndFit">Product Size Fit</Label>
              <Textarea
                id="sizeAndFit"
                placeholder="Information on the sizing and fitting of the product to help you choose the right size..."
                {...register("sizeAndFit")}
                className="mt-1 min-h-[100px]"
              />
              {errors.sizeAndFit && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sizeAndFit.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lookAfterMe">Product LookAtMe</Label>
              <Textarea
                id="lookAfterMe"
                placeholder="Care instructions for maintaining the quality and longevity of the product..."
                {...register("lookAfterMe")}
                className="mt-1 min-h-[100px]"
              />
              {errors.lookAfterMe && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lookAfterMe.message}
                </p>
              )}
            </div>

          </div>
        </motion.section>

        <motion.section {...fadeIn} transition={{ delay: 0.2 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Category</h2>
              <div className="space-y-4">
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category.toLowerCase()}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

             
              </div>
            </CardContent>
          </Card>
        </motion.section>

       
        <motion.section {...fadeIn} transition={{ delay: 0.5 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Media</h2>
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-6 hover:border-indigo-300 transition-colors"
              >
                <Input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {isDragActive
                      ? "Drop the files here..."
                      : "Drag and drop or click to select files"}
                  </p>
                </div>
              </div>

              {/* Display Uploaded Images */}
              {images.main && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {/* Main Image */}
                  <div className="relative group">
                    <Image
                      src={URL.createObjectURL(images.main)}
                      alt="Main Image"
                      width={100}
                      height={100}
                      className="rounded-lg object-cover w-full aspect-square"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => ({ ...prev, main: null }))
                      }
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>

                  {/* Other Images */}
                  {images.others.map((file, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Other Image ${index}`}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-full aspect-square"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => ({
                            ...prev,
                            others: prev.others.filter((_, i) => i !== index),
                          }))
                        }
                        className="absolute top-2 right-2 p-1 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div>
                {errors.images?.main && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.images.main.message}
                  </p>
                )}

                {errors.images?.others && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.images.others.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
          <Card className="bg-[#F8F9FC]">
            
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Product Specifications
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {/* Size Dropdown */}
                <div>
                  <div>
                    <Label
                      htmlFor="basePrice"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Base Price
                    </Label>
                    <Input
                      {...register("basePrice")}
                      id="basePrice"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {errors.basePrice && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.basePrice.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="productSize"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Size
                  </Label>
                  <Select onValueChange={handleSizeChange} >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSizes.map((size) => (
                        <SelectItem
                          key={size}
                          value={size}
                          {...register("size")}
                        >
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.size && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.size.message}
                    </p>
                  )}
                </div>

                {/* Color Dropdown */}
                <div>
                  <Label
                    htmlFor="productColor"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Color
                  </Label>
                  <Select onValueChange={handleColorChange}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColors.map((color) => (
                        <SelectItem
                          key={color}
                          {...register("color")}
                          value={color}
                        >
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.color.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.section
          className="bg-blue-50/50 p-6 rounded-lg"
          variants={sectionVariants}
        >
          <h2 className="text-lg font-semibold mb-4">Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
       
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                {...register("quantity", { valueAsNumber: true })}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>
        </motion.section>
      </form>
    </motion.section>
  );
}
