import type { Metadata } from "next";
import "./globals.css";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { CartProvider } from "@/context/cartContext";

export const metadata: Metadata = {
  title: "Tape Wears👕 ",
  description: "Tape Wears Website👕 ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalStateProvider>
        <CartProvider>
          <body>{children}</body>
        </CartProvider>
      </GlobalStateProvider>
    </html>
  );
}
