import { Header } from "@/components/header/mainHeader";
import { cn } from "@/lib/utils";
import { Flowbite } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { customTheme } from "./baseCustomTheme";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Earn seamlessly",
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
        <Flowbite theme={customTheme}>
          <Header />
          {children}
        </Flowbite>
      </body>
    </html>
  );
}
