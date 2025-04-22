import { z } from "zod";

export const categorySchema = z.object({
  category_name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  thumbnail: z.any().optional(), // We'll store the File object here
});

export type CategoryDto = z.infer<typeof categorySchema>;
