import { StoreKeys } from "@/types/globals";
import { messageEvents } from "./events/message-events";

export const eventTypes = {
  ...messageEvents,
};

type StoreMap = {
  [key: string]: StoreKeys;
};

const storeMap: StoreMap = {
  message: StoreKeys.MessageStore,
};

export function indetifyStoreNameFromEventType(eventType: string) {
  console.log("eventType", eventType);
  const foundEventType = eventTypes[eventType as keyof typeof eventTypes];

  if (!foundEventType) {
    return false;
  }

  const identifiedStore = storeMap[foundEventType];

  if (!identifiedStore) {
    return false;
  }

  return identifiedStore;
}
