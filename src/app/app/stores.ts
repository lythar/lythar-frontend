"use client";
import AccountStore from "@/stores/account-store";
import { ChannelStore } from "@/stores/channel-store";
import { MessageStore } from "@/stores/message-store";
import { OrganizationStore } from "@/stores/organization-store";
import UserPresenceStore from "@/stores/user-presence-store";
import UserStore from "@/stores/user-store";

export const Stores = Promise.all([
  new AccountStore(),
  new ChannelStore(),
  new MessageStore(),
  new OrganizationStore(),
  new UserStore(),
  new UserPresenceStore(),
]);
