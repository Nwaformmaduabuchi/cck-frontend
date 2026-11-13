import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { VariantList } from "./types";


const configuredApiBaseUrl =
  process.env.NEXT_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_BASE_URL = (
  configuredApiBaseUrl ||
  (process.env.NODE_ENV === "production"
    ? "https://cck-backend-4vvv.onrender.com"
    : "http://localhost:8000")
).replace(/\/+$/, "");
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB").format(date);
};

export const formatCurrency = (amount: number | string | null | undefined) => {
  const value = Number(amount ?? 0);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
};

export const StatusStyles = (status: string) => {
  if (status === "completed") {
    return {
      badge: "bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-400 border border-green-200 dark:border-green-500/30",
      dot: "bg-green-500",
      label: status || "Completed",
    };
  }
  if (status === "partial") {
    return {
      badge: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400 border border-red-200 dark:border-red-500/30",
      dot: "bg-red-500",
      label: status || "Partial",
    };
  }
  return {
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30",
    dot: "bg-amber-500",
    label: status || "Pending",
  }
};
