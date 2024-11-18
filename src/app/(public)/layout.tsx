import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PublicRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
