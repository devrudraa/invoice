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
