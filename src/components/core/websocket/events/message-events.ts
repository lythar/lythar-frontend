import { extractEventTypes } from "../lib";

export const messageEvents = {
  NewMessage: "message",
};

export const messageEventTypes = extractEventTypes(messageEvents);
