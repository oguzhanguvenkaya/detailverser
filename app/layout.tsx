import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "DetailVerse",
  description: "Premium hybrid detailing community for enthusiasts and professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} bg-honey-bg font-sans text-honey-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
