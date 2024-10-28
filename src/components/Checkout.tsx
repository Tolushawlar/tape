"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

import OrderSummary from "./OrderSummary";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CheckoutDto, checkoutSchema } from "@/schema";
import AddressForm from "./AddressForm";

export default function CheckoutForm() {
  const form = useForm<CheckoutDto>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryAddress: {
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
      },
      billingAddressType: "same",
      billingAddress: {
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
      },
      shippingMethod: "uk",
      paymentMethod: "paystack",
    },
  });

  const clearBillingAddress = () => {
    form.setValue("billingAddress", {
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
    });
  };

  async function onSubmit(values: CheckoutDto) {
    console.log(values);
  }

  return (
    <FormProvider {...form}>
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold uppercase">
                  Checkout
                </CardTitle>
                <CardDescription className="flex items-center text-green-600">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Your order is almost ready to be shipped. Please enter correct
                  details below to place your order.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <AddressForm
                      form={form}
                      countryName="deliveryAddress.country"
                      stateName="deliveryAddress.state"
                      cityName="deliveryAddress.city"
                      firstName="deliveryAddress.firstName"
                      lastName="deliveryAddress.lastName"
                      email="deliveryAddress.email"
                      phone="deliveryAddress.phone"
                      address="deliveryAddress.address"
                      apartment="deliveryAddress.apartment"
                      postalCode="deliveryAddress.postalCode"
                    />

                    <Separator />

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase">
                            Payment method
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="paystack" />
                                </FormControl>
                                <FormLabel className="font-normal uppercase text-[12px]">
                                  Paystack
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="bank" />
                                </FormControl>
                                <FormLabel className="font-normal uppercase text-[12px]">
                                  Bank deposit
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription>
                            All transactions are secure and encrypted
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <FormField
                      control={form.control}
                      name="billingAddressType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase">
                            Billing address
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);

                                if (value === "same") clearBillingAddress();
                              }}
                              value={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="same" />
                                </FormControl>
                                <FormLabel className="font-normal uppercase text-[12px]">
                                  Same as shipping address
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="different" />
                                </FormControl>
                                <FormLabel className="font-normal uppercase text-[12px]">
                                  Use a different billing address
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />

                          {field.value === "different" && (
                            <AddressForm
                              form={form}
                              countryName="billingAddress.country"
                              stateName="billingAddress.state"
                              cityName="billingAddress.city"
                              firstName="billingAddress.firstName"
                              lastName="billingAddress.lastName"
                              email="billingAddress.email"
                              phone="billingAddress.phone"
                              address="billingAddress.address"
                              apartment="billingAddress.apartment"
                              postalCode="billingAddress.postalCode"
                            />
                          )}
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-blue-600">
                      PAY NOW
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3">
            <OrderSummary />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
