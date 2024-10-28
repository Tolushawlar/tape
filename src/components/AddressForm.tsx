/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

import { cn } from "@/lib/utils";
import { useCountryData } from "@/hooks/useCountryData";
import { UseFormReturn } from "react-hook-form";

interface AddressFormProps {
  form: UseFormReturn<any, undefined>;
  countryName: string;
  stateName: string;
  cityName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  postalCode: string;
}

const AddressForm = ({
  form,
  countryName,
  stateName,
  cityName,
  firstName,
  lastName,
  email,
  phone,
  address,
  apartment,
  postalCode,
}: AddressFormProps) => {
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

  const handlePopoverChange = (
    popover: "country" | "state" | "city",
    isOpen: boolean
  ) => {
    setPopoverOpen((prev) => ({ ...prev, [popover]: isOpen }));
  };

  return (
    <>
      <FormField
        control={form.control}
        name={countryName}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover
              open={popoverOpen.country}
              onOpenChange={(isOpen) => handlePopoverChange("country", isOpen)}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between rounded-none text-[12px]",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? countries?.find(
                          (country) => country.name === field.value
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
                              form.setValue(countryName, country.name);
                              setSelectedCountry(country.isoCode);
                              // Reset state and city when country changes
                              form.setValue(stateName, "");
                              form.setValue(cityName, "");
                              setSelectedState("");
                              handlePopoverChange("country", false);
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
                        <CommandItem>Loading countries...</CommandItem>
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
          name={firstName}
          placeholder="FIRST NAME"
          form={form}
        />

        <CustomFormField name={lastName} placeholder="LAST NAME" form={form} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CustomFormField
          name={email}
          placeholder="EMAIL"
          form={form}
          type="email"
        />

        <CustomFormField
          name={phone}
          placeholder="PHONE NUMBER"
          form={form}
          type="tel"
        />
      </div>

      <CustomFormField name={address} placeholder="ADDRESS" form={form} />

      <CustomFormField
        name={apartment}
        placeholder="Apartment, suite, etc. (optional)"
        form={form}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 items-center">
        <FormField
          control={form.control}
          name={stateName}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover
                open={popoverOpen.state}
                onOpenChange={(isOpen) => handlePopoverChange("state", isOpen)}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between rounded-none mt-2 text-[12px]",
                        !field.value && "text-muted-foreground uppercase"
                      )}
                      disabled={!selectedCountry}
                      onClick={() => handlePopoverChange("state", true)}
                    >
                      {field.value
                        ? states.find((state) => state.name === field.value)
                            ?.name
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
                                form.setValue(stateName, state.name);
                                setSelectedState(state.isoCode);
                                // Reset city when state changes
                                form.setValue(cityName, "");
                                handlePopoverChange("state", false);
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
          control={form.control}
          name={cityName}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover
                open={popoverOpen.city}
                onOpenChange={(isOpen) => handlePopoverChange("city", isOpen)}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between rounded-none mt-2 text-[12px]",
                        !field.value && "text-muted-foreground uppercase"
                      )}
                      onClick={() => handlePopoverChange("city", true)}
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
                                form.setValue(cityName, city.name);
                                handlePopoverChange("city", false);
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
                        form.setValue(cityName, e.target.value);
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
          name={postalCode}
          placeholder="POSTAL CODE"
          form={form}
        />
      </div>
    </>
  );
};

export default AddressForm;
