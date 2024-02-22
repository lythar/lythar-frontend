import { StoreKeys } from "@/types/globals";
import { messageEvents } from "./events/message-events";
import { channelEvents } from "./events/channel-events";

export const eventTypes = {
  ...messageEvents,
  ...channelEvents,
};

type StoreMap = {
  [key: string]: StoreKeys;
};

const storeMap: StoreMap = {
  message: StoreKeys.MessageStore,
  channel: StoreKeys.ChannelStore,
};

export function indetifyStoreNameFromEventType(eventType: string) {
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
