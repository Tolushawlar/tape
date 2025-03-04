import { z } from "zod";

const addressSchema = z.object({
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
});

export const checkoutSchema = z
  .object({
    deliveryAddress: addressSchema,
    billingAddressType: z.enum(["same", "different"]),
    billingAddress: addressSchema.optional(),
    shippingMethod: z.enum(["uk", "other"]),
    paymentMethod: z.enum(["paystack", "bank"]),
  })
  .superRefine((data, ctx) => {
    if (data.billingAddressType === "different" && !data.billingAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Billing address is required when using a different address",
        path: ["billingAddress"],
      });
    }
  });

export type CheckoutDto = z.infer<typeof checkoutSchema>;

export const emptyAddress = {
  country: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  postalCode: "",
};
