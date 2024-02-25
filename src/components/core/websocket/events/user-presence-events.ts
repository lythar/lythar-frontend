import { extractEventTypes } from "../lib";

export const UserPresenceEvents = {
  UserStatusBulk: "userPresence",
  UserStatus: "userPresence",
};

export const userPresenceEventTypes = extractEventTypes(UserPresenceEvents);
