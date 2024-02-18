import { ChannelStore } from "@/stores/channel-store";
import { MessageStore } from "@/stores/message-store";
import { OrganizationStore } from "@/stores/organization-store";
import { components } from "./api";
import AccountStore from "@/stores/account-store";

export type $TODO = any;


type RawIntersetion<T> = T & {};

type RemovePartial<T> = RawIntersetion<{
  [P in keyof T]-?: T[P];
}>;

export type User = RemovePartial<components["schemas"]["UserAccountResponse"]>;

export type Message = RemovePartial<components["schemas"]["ListMessagesResponse"]>;

export type Channel = Required<components["schemas"]["Channel"]>;

export type Organization = {
  ORG_NAME: string;
}

export type StoreKeysWithoutNone = Exclude<StoreKeys, StoreKeys.None>

export enum StoreKeys {
  None = "None",
  AccountStore = "AccountStore",
  ChannelStore = "ChannelStore",
  MessageStore = "MessageStore",
  OrganizationStore = "OrganizationStore",
}

export type StoreType = {
  [StoreKeys.AccountStore]: AccountStore;
  [StoreKeys.ChannelStore]: ChannelStore;
  [StoreKeys.MessageStore]: MessageStore;
  [StoreKeys.OrganizationStore]: OrganizationStore;
}

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type CombinedStore = UnionToIntersection<StoreType[keyof StoreType]>;