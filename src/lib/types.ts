import { ChannelStore } from "@/stores/channel-store";

export type ExtractArray<T> = T extends (infer U)[] ? U : never;

export type $TODO = any;

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar_url: string;
}

type SecureUser = Omit<User, 'password'>;

export type PublicUser = Partial<SecureUser>;

export type Message = {
  id: string;
  channelId: string;
  userId: string;
  content: string;
}

export type Channel = {
  id:string;
  name: string;
  description: string;
}

export type StoreKeysWithoutNone = Exclude<StoreKeys, StoreKeys.None>

export enum StoreKeys {
  None = "None",
  ChannelStore = "ChannelStore",
}

export type StoreType = {
  [StoreKeys.ChannelStore]: ChannelStore;
}
