import { extractEventTypes } from "../lib";

export const channelEvents = {
  ChannelCreated: "channel",
  ChannelDeleted: "channel",
};

export const channelEventTypes = extractEventTypes(channelEvents);
