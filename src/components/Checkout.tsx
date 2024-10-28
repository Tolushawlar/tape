"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle2, ChevronsUpDown } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CustomFormField } from "./CustomFormField";

import { useCountryData } from "@/hooks/useCountryData";
import { cn } from "@/lib/utils";
import { CheckoutDto, checkoutSchema } from "@/schema";

export default function CheckoutForm() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [popoverOpen, setPopoverOpen] = useState({
    country: false,
    state: false,
    city: false,
  });

  const { countries, states, cities } = useCountryData(
    selectedCountry,
    selectedState
  );

  const methods = useForm<CheckoutDto>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
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
      shippingMethod: "uk",
      paymentMethod: "paystack",
      billingAddress: "same",
    },
  });

  const handlePopoverChange = (
    popover: "country" | "state" | "city",
    isOpen: boolean
  ) => {
    setPopoverOpen((prev) => ({ ...prev, [popover]: isOpen }));
  };

  async function onSubmit(values: CheckoutDto) {
    console.log(values);
  }

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Checkout</CardTitle>
                <CardDescription className="flex items-center text-green-600">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Your order is almost ready to be shipped. Please enter correct
                  details below to place your order.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={methods.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover
                            open={popoverOpen.country}
                            onOpenChange={(isOpen) =>
                              handlePopoverChange("country", isOpen)
                            }
                          >
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? countries?.find(
                                        (country) =>
                                          country.isoCode === field.value
                                      )?.name
                                    : "COUNTRY"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command className="lg:w-[600px]">
                                <CommandInput placeholder="Search country..." />
                                <CommandList>
                                  <CommandEmpty>No country found.</CommandEmpty>
                                  <CommandGroup>
                                    {countries && countries.length > 0 ? (
                                      countries.map((country) => (
                                        <CommandItem
                                          className="w-full"
                                          value={country.name}
                                          key={country.isoCode}
                                          onSelect={() => {
                                            methods.setValue(
                                              "country",
                                              country.isoCode
                                            );
                                            setSelectedCountry(country.isoCode);
                                            // Reset state and city when country changes
                                            methods.setValue("state", "");
                                            methods.setValue("city", "");
                                            setSelectedState("");
                                            handlePopoverChange(
                                              "country",
                                              false
                                            );
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              country.isoCode === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {country.name}
                                        </CommandItem>
                                      ))
                                    ) : (
                                      <CommandItem>
                                        Loading countries...
                                      </CommandItem>
                                    )}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <CustomFormField
                        name="firstName"
                        placeholder="FIRST NAME"
                        form={methods}
                      />

                      <CustomFormField
                        name="lastName"
                        placeholder="LAST NAME"
                        form={methods}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <CustomFormField
                        name="email"
                        placeholder="EMAIL"
                        form={methods}
                        type="email"
                      />

                      <CustomFormField
                        name="phone"
                        placeholder="PHONE NUMBER"
                        form={methods}
                        type="tel"
                      />
                    </div>

                    <CustomFormField
                      name="address"
                      placeholder="ADDRESS"
                      form={methods}
                    />

                    <CustomFormField
                      name="apartment"
                      placeholder="Apartment, suite, etc. (optional)"
                      form={methods}
                    />

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 items-center">
                      <FormField
                        control={methods.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>State</FormLabel>
                            <Popover
                              open={popoverOpen.state}
                              onOpenChange={(isOpen) =>
                                handlePopoverChange("state", isOpen)
                              }
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                    disabled={!selectedCountry}
                                    onClick={() =>
                                      handlePopoverChange("state", true)
                                    }
                                  >
                                    {field.value
                                      ? states.find(
                                          (state) =>
                                            state.isoCode === field.value
                                        )?.name
                                      : "STATE"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search state..." />
                                  <CommandList>
                                    <CommandEmpty>No state found.</CommandEmpty>
                                    <CommandGroup>
                                      {states && states.length > 0 ? (
                                        states.map((state) => (
                                          <CommandItem
                                            value={state.name}
                                            key={state.isoCode}
                                            onSelect={() => {
                                              methods.setValue(
                                                "state",
                                                state.isoCode
                                              );
                                              setSelectedState(state.isoCode);
                                              // Reset city when state changes
                                              methods.setValue("city", "");
                                              handlePopoverChange(
                                                "state",
                                                false
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                state.isoCode === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {state.name}
                                          </CommandItem>
                                        ))
                                      ) : (
                                        <CommandItem>
                                          {selectedCountry
                                            ? "No states available"
                                            : "Select a country first"}
                                        </CommandItem>
                                      )}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={methods.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Popover
                              open={popoverOpen.city}
                              onOpenChange={(isOpen) =>
                                handlePopoverChange("city", isOpen)
                              }
                            >
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between",
                                      !field.value &&
                                        "text-muted-foreground uppercase"
                                    )}
                                    onClick={() =>
                                      handlePopoverChange("city", true)
                                    }
                                  >
                                    {field.value || "CITY"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <Command>
                                  <CommandInput placeholder="Search city..." />
                                  <CommandList>
                                    <CommandEmpty>No city found.</CommandEmpty>
                                    <CommandGroup>
                                      {cities && cities.length > 0 ? (
                                        cities.map((city) => (
                                          <CommandItem
                                            value={city.name}
                                            key={city.name}
                                            onSelect={() => {
                                              methods.setValue(
                                                "city",
                                                city.name
                                              );
                                              handlePopoverChange(
                                                "city",
                                                false
                                              );
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                city.name === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                            {city.name}
                                          </CommandItem>
                                        ))
                                      ) : (
                                        <CommandItem>
                                          {selectedState
                                            ? "No cities available"
                                            : "Select a state first"}
                                        </CommandItem>
                                      )}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                                <Separator className="my-2" />
                                <div className="p-2">
                                  <Input
                                    placeholder="Enter city manually"
                                    value={field.value}
                                    onChange={(e) => {
                                      methods.setValue("city", e.target.value);
                                    }}
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <CustomFormField
                        name="postalCode"
                        placeholder="POSTAL CODE"
                        form={methods}
                      />
                    </div>

                    <Separator />

                    <FormField
                      control={methods.control}
                      name="shippingMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="uppercase">
                            Shipping method
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="uk" />
                                </FormControl>
                                <FormLabel className="font-normal uppercase">
                                  Delivery within the UK
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="other" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  International Delivery
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <FormField
                      control={methods.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Payment method</FormLabel>
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
                                <FormLabel className="font-normal">
                                  Paystack
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="bank" />
                                </FormControl>
                                <FormLabel className="font-normal">
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
                      control={methods.control}
                      name="billingAddress"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Billing address</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="same" />
                                </FormControl>
                                <FormLabel className="font-normal uppercase">
                                  Same as shipping address
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="different" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Use a different billing address
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-blue-600">
                      Place order
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
