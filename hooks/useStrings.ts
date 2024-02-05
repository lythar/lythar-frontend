'use client';

export const useStrings = <T>(strings:T) => {
  return (key: keyof T) => strings[key]
}