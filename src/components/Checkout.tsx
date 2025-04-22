"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useCart } from "@/context/cartContext";

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
import { CheckoutDto, checkoutSchema, emptyAddress } from "@/schema";
import AddressForm from "./AddressForm";

export default function CheckoutForm() {
  const { cartItems } = useCart();
  const form = useForm<CheckoutDto>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryAddress: emptyAddress,
      billingAddressType: "same",
      billingAddress: undefined,
      shippingMethod: "uk",
      paymentMethod: "paystack",
    },
  });

  const clearBillingAddress = () => {
    form.setValue("billingAddress", undefined);
  };

  const router = useRouter();

  async function onSubmit(values: CheckoutDto) {
    try {
      const delivery = values.deliveryAddress;
      const billing = values.billingAddressType === 'different' ? values.billingAddress : delivery;

      const total = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
      console.log(cartItems);
      const orderData = {
        created_at: Date.now(),
        quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        purchased_at: Date.now(),
        product_id: cartItems.map(item => item.id),
        user_id: 0,
        Total: total,
        first_name: delivery.firstName,
        last_name: delivery.lastName,
        email: delivery.email,
        phone_number: delivery.phone,
        address: delivery.address,
        country: delivery.country,
        city: delivery.city,
        state: delivery.state,
        postal_code: delivery.postalCode,
        billing_address: billing?.address,
        billing_country: billing?.country,
        billing_first_name: billing?.firstName,
        billing_last_name: billing?.lastName,
        billing_email: billing?.email,
        billing_phone_number: billing?.phone,
        billing_apartment: billing?.apartment,
        billing_state: billing?.state,
        billing_city: billing?.city,
        billing_postal_code: billing?.postalCode,
        cart_items: cartItems
      };

      const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:n8LTdo38/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        router.push('/');
      } else {
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
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
