"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left side - Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative hidden md:block"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </motion.div>

      {/* Right side - Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-center p-8"
      >
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="space-y-6 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Logo />
            </motion.div>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">LOGIN</h1>
              <p className="text-sm text-muted-foreground">
                Please fill in your Admin credentials
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your Admin Email</FormLabel>
                      <FormControl>
                        <Input placeholder="wisdo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500"
                >
                  LOGIN
                </Button>

                <div className="space-y-2 text-center text-sm">
                  <p className="text-muted-foreground">Do not have login?</p>
                  <p className="text-muted-foreground">
                    Please contact Super Admin at{" "}
                    <Link
                      href="tel:+2349132121191"
                      className="text-blue-600 hover:text-blue-500"
                    >
                      +2349132121191
                    </Link>{" "}
                    for assistance
                  </p>
                </div>
              </motion.div>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
}
