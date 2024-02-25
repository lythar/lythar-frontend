import { ChannelStore } from "@/stores/channel-store";
import { MessageStore } from "@/stores/message-store";
import { OrganizationStore } from "@/stores/organization-store";
import { components } from "./api";
import AccountStore from "@/stores/account-store";
import UserPresenceStore from "@/stores/user-presence-store";
import UserStore from "@/stores/user-store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type $TODO = any;

export type StringTypeToObj<T extends string> = { [K in T]: string };

type RawIntersetion<T> = T & object;

type RemovePartial<T> = RawIntersetion<{
  [P in keyof T]-?: T[P];
}>;

export type User = RemovePartial<components["schemas"]["UserAccountResponse"]>;
export type Account = RemovePartial<
  components["schemas"]["UserAccountResponse"]
>;

export type UserStatus = {
  accountId: number;
  status: { isOnline: boolean };
};

export type UserStatusBulk = number;

export type Message = RemovePartial<
  components["schemas"]["ListMessagesResponse"]
>;

export type Channel = Required<components["schemas"]["Channel"]>;

export type Organization = {
  ORG_NAME: string;
};

export type Settings = {
  useStackedSidebar: boolean;
  drawFps: boolean;
};

export type StoreKeysWithoutNone = Exclude<StoreKeys, StoreKeys.None>;

export enum StoreKeys {
  None = "None",
  AccountStore = "AccountStore",
  UserStore = "UserStore",
  UserPresenceStore = "UserPresenceStore",
  ChannelStore = "ChannelStore",
  MessageStore = "MessageStore",
  OrganizationStore = "OrganizationStore",
}

export type StoreType = {
  [StoreKeys.AccountStore]: AccountStore;
  [StoreKeys.UserStore]: UserStore;
  [StoreKeys.UserPresenceStore]: UserPresenceStore;
  [StoreKeys.ChannelStore]: ChannelStore;
  [StoreKeys.MessageStore]: MessageStore;
  [StoreKeys.OrganizationStore]: OrganizationStore;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type CombinedStore = UnionToIntersection<StoreType[keyof StoreType]>;
