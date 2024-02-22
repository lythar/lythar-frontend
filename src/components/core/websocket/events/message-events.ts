import { extractEventTypes } from "../lib";

export const messageEvents = {
  NewMessage: "message",
  MessageDeleted: "message",
  MessageEdited: "message",
};

export const messageEventTypes = extractEventTypes(messageEvents);
