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

export const getInitials = (name: string) => {
  const nameArray = name.split(" ");
  return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
};

export const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "";
};

export const getWsUrl = () => {
  return getApiUrl().replace("http", "ws");
};
