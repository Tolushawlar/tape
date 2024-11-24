"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditProductDto, editProductSchema } from "@/schema/product";
import { TagInputField } from "@/components/ui/input-with-tags";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fadeIn } from "@/utils";

export function EditProductForm() {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProductDto>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: "Oversize T-shirt",
      description:
        "As classic as they come, this is the garment that speaks to every man. Designed to stand the test of time, our signature straight-cut crew neck T-Shirt is cut from a compact organic, extra-long staple cotton jersey and accentuated with a ribbed neckline.",
      category: "Men",
      tags: [
        { id: "1", text: "Oversize" },
        { id: "2", text: "Tshirt" },
      ],
      status: "Published",
      productDetails:
        "Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus donec varius hendrerit facilisis vitae massa.",
      sizeAndFit:
        "Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus donec varius hendrerit facilisis vitae massa.",
      lookAfterMe:
        "Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus donec varius hendrerit facilisis vitae massa.",
      aboutMe:
        "Lorem ipsum dolor sit amet consectetur. Odio velit placerat sit nulla pretium lectus phasellus. Magna tellus porta sem viverra at ornare enim ante sit. Diam tellus tellus donec varius hendrerit facilisis vitae massa.",
      basePrice: "85,000",
      discountType: "No Discount",
      taxClass: "Tax Free",
      sku: "302002",
      barcode: "0984939101123",
      quantity: "124",
      variations: [],
      isPhysicalProduct: true,
      weight: "0.25",
      height: "10",
      length: "10",
      width: "7",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "variations",
    control,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  function onSubmit(data: EditProductDto) {
    console.log(data);
  }

  const status = watch("status");

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="container mx-auto py-6 space-y-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                General Information
              </h2>
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </Label>
                  <Input
                    {...register("name")}
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </Label>
                  <Textarea
                    {...register("description")}
                    id="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Category</h2>
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Category
                  </Label>
                  <Select {...register("category")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                      <SelectItem value="Men">Men</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                      <SelectItem value="Kids">Kids</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category.message}
                    </p>
                  )}
                </div>
                <TagInputField
                  id="tags"
                  name="tags"
                  control={control}
                  label="Product Tags"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
                <Select {...register("status")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Other Information</h2>
              <div className="space-y-4">
                {["productDetails", "sizeAndFit", "lookAfterMe", "aboutMe"].map(
                  (field) => (
                    <div key={field}>
                      <Label
                        htmlFor={field}
                        className="block text-sm font-medium text-gray-700 capitalize"
                      >
                        {field.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <Textarea
                        {...register(field as keyof EditProductDto)}
                        id={field}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {errors[field as keyof EditProductDto] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[field as keyof EditProductDto]?.message}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.5 }}>
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
        </motion.div>

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
                      <SelectContent className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <SelectItem value="No Discount">No Discount</SelectItem>
                        <SelectItem value="Percentage">Percentage</SelectItem>
                        <SelectItem value="Fixed">Fixed</SelectItem>
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
                      {...register("discountPercentage")}
                      id="discountPercentage"
                      type="text"
                      placeholder="Type discount percentage..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
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
                    <SelectContent className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                      <SelectItem value="Tax Free">Tax Free</SelectItem>
                      <SelectItem value="Taxable">Taxable</SelectItem>
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
                    type="text"
                    placeholder="Type VAT amount..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.7 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Inventory</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label
                    htmlFor="sku"
                    className="block text-sm font-medium text-gray-700"
                  >
                    SKU
                  </Label>
                  <Input
                    {...register("sku")}
                    id="sku"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.sku && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.sku.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="barcode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Barcode
                  </Label>
                  <Input
                    {...register("barcode")}
                    id="barcode"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </Label>
                  <Input
                    {...register("quantity")}
                    id="quantity"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.8 }}>
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
                      <SelectContent className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <SelectItem value="Color">Color</SelectItem>
                        <SelectItem value="Size">Size</SelectItem>
                        <SelectItem value="material">Material</SelectItem>
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
                      <Trash2 className="h-4 w-4" />
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
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.9 }}>
          <Card className="bg-[#F8F9FC]">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      {...register("isPhysicalProduct")}
                      id="isPhysicalProduct"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label
                      htmlFor="isPhysicalProduct"
                      className="font-medium text-gray-700"
                    >
                      This is a physical product
                    </Label>
                  </div>
                </div>
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
                        {...register(field as keyof EditProductDto)}
                        id={field}
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ delay: 1 }}
          className="flex justify-end gap-4"
        >
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
