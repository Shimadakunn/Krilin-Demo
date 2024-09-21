import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krilin",
  description: "Stack without hands",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
