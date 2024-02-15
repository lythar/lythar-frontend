import { Logger } from "@/lib/logger"

export const dynamicLogger = () => {
  const logger = new Logger("LogHook", "#1694c9");
  return logger;
}