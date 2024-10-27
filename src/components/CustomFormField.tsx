/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cloneElement, ReactElement } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { PasswordInput } from "./PasswordInput";

interface CustomFormFieldProps {
  name: string;
  label: string;
  type?: string;
  form: UseFormReturn<any>;
  placeholder?: string;
  selectItems?: readonly string[];
  readonly?: boolean;
}

export const CustomFormField = ({
  name,
  label,
  type = "text",
  form,
  placeholder,
  selectItems,
  readonly = false,
}: CustomFormFieldProps) => {
  const { control } = form;

  // Handle select fields separately for clarity
  if (type === "select" && selectItems) {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectItems.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  // Helper to determine field type
  const renderField = (fieldProps: any) => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            {...fieldProps}
            className="dark:bg-transparent dark:border-gray-950"
          />
        );
      case "password":
        return <PasswordInput {...fieldProps} />;
      default:
        return (
          <Input
            readOnly={readonly}
            type={type}
            min={0}
            {...fieldProps}
            className="dark:bg-transparent dark:border-gray-950"
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderField(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CustomFormFieldWithChildProps {
  children: ReactElement;
  className?: string;
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type?: string;
}

export const CustomFormFieldWithChild = ({
  children,
  className,
  form,
  name,
  label,
  type,
}: CustomFormFieldWithChildProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className={cn(className)}>
            <FormLabel className="w-full">{label}</FormLabel>
            <FormControl>
              {type === "checkbox"
                ? cloneElement(children, {
                    checked: field.value,
                    onCheckedChange: field.onChange,
                  })
                : cloneElement(children, { ...field })}
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
