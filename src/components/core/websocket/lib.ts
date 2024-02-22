import { StringTypeToObj } from "@/types/globals";

export function extractEventTypes<T extends StringTypeToObj<string>>(
  events: T
): T {
  const keys = Object.keys(events);

  return keys.reduce((acc, key) => ({ ...acc, [key]: key }), {} as T);
}
