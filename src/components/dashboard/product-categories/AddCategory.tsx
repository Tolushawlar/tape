/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryDto, categorySchema } from "@/schema/category";
import { Dropzone } from "../Dropzone";

export function AddCategoryForm() {
  const router = useRouter();
  const [thumbnail, setThumbnail] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryDto>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name: "",
      description: "",
      thumbnail: null,
    },
  });

  const onSubmit = async (data: CategoryDto) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const result = await response.json();
      console.log("Category created:", result);
      router.push('/admin/dashboard/product-categories');
      
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleDrop = React.useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       const imageUrl = URL.createObjectURL(file);
  //       setThumbnail(imageUrl);
  //       setValue("thumbnail", file);
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Add Category</h1>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Category'}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-md space-y-6">
              <h2 className="text-lg font-medium">General Information</h2>
              <div>
                <label
                  htmlFor="category_name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category Name
                </label>
                <Controller
                  name="category_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="category_name"
                      placeholder="Type category name here..."
                      {...field}
                      className="bg-white"
                    />
                  )}
                />
                {errors.category_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category_name.message}
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

          {/* <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-md space-y-6">
              <h2 className="text-lg font-medium">Thumbnail</h2>
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
          </div> */}
        </div>
      </form>
    </div>
  );
}
