import type { Metadata } from "next";
import "./globals.css";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { CartProvider } from "@/context/cartContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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
          <body>
            <Navbar />
            {children}
            <Footer />
          </body>
        </CartProvider>
      </GlobalStateProvider>
    </html>
  );
}
