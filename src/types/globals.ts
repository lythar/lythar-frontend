import { ChannelStore } from "@/stores/channel-store";
import { MessageStore } from "@/stores/message-store";
import { OrganizationStore } from "@/stores/organization-store";
import { operations, components } from "./api";

export type $TODO = any;

export type User = Required<components["schemas"]["UserAccountResponse"]>;

export type Message = Required<components["schemas"]["ListMessagesResponse"]>;

export type Channel = Required<components["schemas"]["Channel"]>;

export type Organization = {
  ORG_NAME: string;
}

export type StoreKeysWithoutNone = Exclude<StoreKeys, StoreKeys.None>

export enum StoreKeys {
  None = "None",
  ChannelStore = "ChannelStore",
  MessageStore = "MessageStore",
  OrganizationStore = "OrganizationStore",
}

export type StoreType = {
  [StoreKeys.ChannelStore]: ChannelStore;
  [StoreKeys.MessageStore]: MessageStore;
  [StoreKeys.OrganizationStore]: OrganizationStore;
}

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export type CombinedStore = UnionToIntersection<StoreType[keyof StoreType]>;