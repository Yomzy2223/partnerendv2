import { Header } from "@/components/header/mainHeader";
import Providers from "@/lib/helpers/provider";
import { cn } from "@/lib/utils";
import { Flowbite } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { customTheme } from "./baseCustomTheme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Partnership Flow",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "selection:bg-primary/30 min-h-screen")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
