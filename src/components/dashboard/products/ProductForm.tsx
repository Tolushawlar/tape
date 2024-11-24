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

const categories = ["Men", "Women", "Kids", "Accessories"];
const discountTypes = ["Percentage", "Fixed Amount"];
const taxClasses = ["Standard", "Reduced", "Zero"];
const variationTypes = ["Size", "Color", "Material", "Style"];

export function AddProductForm() {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductDto>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      tags: [],
      status: "Draft",
      basePrice: 0,
      sku: "",
      quantity: 0,
      variations: [],
      isPhysical: true,
      dimensions: {
        weight: 0,
        height: 0,
        length: 0,
        width: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "variations",
    control,
  });

  const onSubmit = (data: ProductDto) => {
    console.log("Form data:", data);
    // HandlaproductSchema form submission
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  const status = watch("status");

  return (
    <motion.section
      className="container mx-auto p-6 max-w-5xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Add Products</h1>
          <div
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              status === "Published"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </div>
        </div>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Save Product
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Type product description here..."
                {...register("description")}
                className="mt-1 min-h-[100px]"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* <div>
              <Label htmlFor="category">Category</Label>
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
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div> */}

            {/* <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.status.message}
                </p>
              )}
            </div> */}
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

                <TagInputField
                  id="tags"
                  name="tags"
                  control={control}
                  label="Product Tags"
                />
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Status</h2>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    status === "Published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {status}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Status
                </Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
                      : "Drag and drop image here, or click to Select files"}
                  </p>
                </div>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {images.map((file, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-full aspect-square"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages(images.filter((_, i) => i !== index))
                        }
                        className="absolute top-2 right-2 p-1 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.section>

        <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Pricing</h2>
              <div className="grid gap-4 md:grid-cols-2">
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
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="discountType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Discount Type
                    </Label>
                    <Select {...register("discountType")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        {discountTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="discountPercentage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Discount Percentage (%)
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      max="100"
                      {...register("discountPercentage", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.discountPercentage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.discountPercentage.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="taxClass"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tax Class
                  </Label>
                  <Select {...register("taxClass")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax class" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxClasses.map((taxClass) => (
                        <SelectItem
                          key={taxClass}
                          value={taxClass.toLowerCase()}
                        >
                          {taxClass}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="vatAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    VAT Amount (%)
                  </Label>
                  <Input
                    {...register("vatAmount")}
                    id="vatAmount"
                    type="number"
                    placeholder="Type VAT amount..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
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
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                placeholder="Type product SKU here..."
                {...register("sku")}
              />
              {errors.sku && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sku.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                id="barcode"
                placeholder="Product barcode..."
                {...register("barcode")}
              />
            </div>
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

        <motion.section {...fadeIn} transition={{ delay: 0.8 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Variation</h2>
              {fields.map((field, index) => (
                <div key={field.id} className="grid gap-4 md:grid-cols-2 mb-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor={`variations.${index}.type`}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Variation Type
                    </Label>
                    <Select {...register(`variations.${index}.type` as const)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select variation" />
                      </SelectTrigger>
                      <SelectContent>
                        {variationTypes.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <Label
                        htmlFor={`variations.${index}.value`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Variation
                      </Label>
                      <Input
                        {...register(`variations.${index}.value` as const)}
                        id={`variations.${index}.value`}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="mt-6"
                      onClick={() => remove(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => append({ type: "", value: "" })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Variant
              </Button>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          className="bg-blue-50/50 p-6 rounded-lg"
          variants={sectionVariants}
        >
          <h2 className="text-lg font-semibold mb-4">Shipping</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Controller
                name="isPhysical"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="isPhysical"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="isPhysical">This is a physical product</Label>
            </div>

            {watch("isPhysical") && (
              <div className="grid gap-4 md:grid-cols-4">
                {["weight", "height", "length", "width"].map((field) => (
                  <div key={field}>
                    <Label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 capitalize"
                    >
                      {field}
                    </Label>
                    <Input
                      {...register(field as keyof ProductDto, {
                        valueAsNumber: true,
                      })}
                      id={field}
                      type="number"
                      className="mt-1 "
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </form>
    </motion.section>
  );
}
