import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatINRShort(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`;
  }
  return `₹${amount.toFixed(0)}`;
}

export function generateToken(prefix: string = "AUT"): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${result}`;
}

export function generateNumber(prefix: string): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
}

export const INDIAN_STATES = [
  { code: "27", name: "Maharashtra (Home State)" },
  { code: "24", name: "Gujarat" },
  { code: "29", name: "Karnataka" },
  { code: "28", name: "Andhra Pradesh" },
  { code: "08", name: "Rajasthan" },
  { code: "23", name: "Madhya Pradesh" },
  { code: "09", name: "Uttar Pradesh" },
  { code: "07", name: "Delhi" },
  { code: "03", name: "Punjab" },
  { code: "06", name: "Haryana" },
  { code: "33", name: "Tamil Nadu" },
  { code: "32", name: "Kerala" },
  { code: "19", name: "West Bengal" },
];
