import { z } from "zod";

export const checkoutSchema = z.object({
  country: z.string().min(1, "Country is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  shippingMethod: z.enum(["lagos", "other"]),
  paymentMethod: z.enum(["paystack", "bank"]),
  billingAddress: z.enum(["same", "different"]),
});

export type CheckoutDto = z.infer<typeof checkoutSchema>;
