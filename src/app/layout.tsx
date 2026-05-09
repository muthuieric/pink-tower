import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pink Tower International School",
  description: "Nurturing young minds through excellence in education. Located in Mzima Springs & Convent Road.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body>{children}</body>
    </html>
  );
}
