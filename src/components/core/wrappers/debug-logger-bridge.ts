"use client";
import { Logger } from "@/lib/logger";

const logger = new Logger("DebugLoggerBridge", "#4c97ed");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logDebug = (message: string, data?: any) => {
  logger.info(message, data || "");
};
