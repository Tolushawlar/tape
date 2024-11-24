/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dropzone } from "../Dropzone";

import { CategoryDto, categorySchema } from "@/schema/category";

const defaultCategory = {
  name: "Oversize T-shirt",
  description:
    "As classic as they come, this is the garment that speaks to every man. Designed to stand the test of time, our signature straight-cut crew neck T-Shirt is cut from a compact organic, extra-long staple cotton jersey and accentuated with a ribbed neckline.",
  thumbnail: "/placeholder.svg",
};

export function EditCategoryForm() {
  const [thumbnail, setThumbnail] = React.useState<string | null>(
    defaultCategory.thumbnail
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryDto>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: defaultCategory.name,
      description: defaultCategory.description,
      thumbnail: defaultCategory.thumbnail,
    },
  });

  const onSubmit = (data: CategoryDto) => {
    console.log("Form data:", data);
    // Here you would typically handle the form submission
  };

  const handleDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setThumbnail(imageUrl);
        setValue("thumbnail", file);
      }
    },
    [setValue]
  );

  return (
    <div>
      <div className="bg-blue-950 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard/product-categories"
                className="hover:opacity-80"
              >
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <h1 className="text-lg font-medium">Edit Category</h1>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-md space-y-6">
                <h2 className="text-lg font-medium">General Information</h2>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="name"
                        placeholder="Type category name here..."
                        {...field}
                        className="bg-white"
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="description"
                        placeholder="Type category description here..."
                        className="min-h-[100px] bg-white"
                        {...field}
                      />
                    )}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-md space-y-6">
                <h2 className="text-lg font-medium">Media</h2>
                <div>
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Photo
                  </label>
                  <Controller
                    name="thumbnail"
                    control={control}
                    render={({ field: { value, onChange, ...field } }) => (
                      <Dropzone
                        id="thumbnail"
                        thumbnail={thumbnail}
                        onFilesDropped={handleDrop}
                        {...field}
                      />
                    )}
                  />
                  {errors.thumbnail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.thumbnail.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
