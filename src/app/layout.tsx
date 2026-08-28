import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import RFQDrawer from "@/components/RFQDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai AutoHub — B2B Automotive Sales, Quotation & Inventory Platform",
  description:
    "Official B2B Portal for Sai Envirotech Solutions (Uran Islampur, Sangli). Manufacturing & export of automotive bumpers, tractor parts, and spare body panels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        <AppProvider>
          {children}
          {/* Global RFQ Drawer */}
          <RFQDrawer />
        </AppProvider>
      </body>
    </html>
  );
}
