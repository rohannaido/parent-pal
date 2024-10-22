import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "Parent Pal",
  description: "A tool to help parents with their children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
