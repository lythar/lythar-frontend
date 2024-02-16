"use client"
import { Logger } from "@/lib/logger";

const logger = new Logger("DebugLoggerBridge", "#4c97ed");

export const logDebug = (message: string, data?: any) => {
  logger.info(message, data || "");
};