import { clsx, type ClassValue } from "clsx";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ServerErrorResponse = {
  type: "error";
  errors: Record<string, string[]>;
};

export function setFormServerErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  response: ServerErrorResponse
) {
  if (response?.type === "error" && response.errors) {
    Object.entries(response.errors).forEach(([field, messages]) => {
      setError(field as Path<T>, {
        type: "server",
        message: Array.isArray(messages) ? messages[0] : messages,
      });
    });
  }
}

export const Currency = ["INR", "USD", "EUR", "GBP"] as const;
export type CurrencyType = (typeof Currency)[number];

interface iAppProps {
  amount: number;
  currency: CurrencyType;
}

export function formatCurrency({ amount, currency }: iAppProps) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

// Market value as per 20/05/25
// It will help in calculating the total amount
// to show on the dashboard
export const ratesToUSD: Record<string, number> = {
  INR: 0.01154,
  EUR: 1.152,
  GBP: 1.3477,
  USD: 1,
};
