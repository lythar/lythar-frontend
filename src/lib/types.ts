export type ExtractArray<T> = T extends (infer U)[] ? U : never;

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
  members: User[];
}

export enum StoreLocalStorageKeys {
  ChannelStore = "ChannelStore",
  MessageStore = "MessageStore",
}