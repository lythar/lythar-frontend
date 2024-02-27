import { extractEventTypes } from "../lib";

export const channelEvents = {
  NewChannel: "channel",
  ChannelDeleted: "channel",
  ChannelUpdated: "channel",
};

export const channelEventTypes = extractEventTypes(channelEvents);
