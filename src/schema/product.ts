import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  basePrice: z.coerce.number().min(0, "Price must be positive"),
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  productDetails: z.string().min(1, "Content is requried"),
  sizeAndFit: z.string().min(1, "Content is requried"),
  lookAfterMe: z.string().min(1, "Content is requried"),
  aboutMe: z.string().min(1, "Content is requried"),
  quantity: z.number().min(0, "Quantity must be positive"),

  // ✅ Images validation with required fields & error messages
  images: z.object({
    main: z.string().url("Main image must be a valid URL").min(1, "Main image is required"), // Ensures main image is required
    others: z.array(z.string().url("Each image must be a valid URL"))
      .min(1, "At least one additional image is required"), // Ensures at least one other image
  }),
  // tags: z.array(
  //   z.object({
  //     id: z.string(),
  //     text: z.string(),
  //   })
  // ),
  // status: z.enum(["Draft", "Published"]),
  // discountType: z.string().optional(),
  // discountPercentage: z.number().min(0).max(100).optional(),
  // taxClass: z.string().optional(),
  // vatAmount: z.number().min(0).max(100).optional(),
  // sku: z.string().min(1, "SKU is required"),
  // barcode: z.string().optional(),
  // variations: z
  //   .array(
  //     z.object({
  //       type: z.string(),
  //       value: z.string(),
  //     })
  //   )
  //   .optional(),
  // isPhysical: z.boolean(),
  // dimensions: z
  //   .object({
  //     weight: z.number().optional(),
  //     height: z.number().optional(),
  //     length: z.number().optional(),
  //     width: z.number().optional(),
  //   })
  //   .optional(),
});

export type ProductDto = z.infer<typeof productSchema>;

export const editProductSchema = z.object({
  // General Information
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),

  // Category
  category: z.string().min(1, "Category is required"),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),

  // Status
  status: z.enum(["Published", "Draft"]),

  // Other Information
  productDetails: z.string(),
  sizeAndFit: z.string(),
  lookAfterMe: z.string(),
  aboutMe: z.string(),

  // Pricing
  basePrice: z.string().min(1, "Base price is required"),
  discountType: z.string().optional(),
  discountPercentage: z.string().optional(),
  taxClass: z.string(),
  vatAmount: z.string(),

  // Inventory
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string(),
  quantity: z.string().min(1, "Quantity is required"),

  // Variations
  variations: z.array(
    z.object({
      type: z.string(),
      value: z.string(),
    })
  ),

  // Shipping
  isPhysicalProduct: z.boolean(),
  weight: z.string(),
  height: z.string(),
  length: z.string(),
  width: z.string(),
});

export type EditProductDto = z.infer<typeof editProductSchema>;
