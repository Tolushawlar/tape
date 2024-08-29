import "./globals.css";

export const metadata = {
  title: "Tape Wears👕 ",
  description: "Tape Wears Website👕 ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
