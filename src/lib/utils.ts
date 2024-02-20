import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(text: string) {
  try {
    navigator.clipboard.writeText(text);
  } catch (e) {
    console.error(e);
  }
}
