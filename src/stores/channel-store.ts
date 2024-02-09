"use client";
import { Channel, StoreKeys } from "@/lib/types";
import Store from "./base-store";
import { exampleChannels } from "@/example_data";

export class ChannelStore extends Store<Channel> {
  public override storeName: StoreKeys = StoreKeys.ChannelStore

  public constructor() {
    super()

    for (const channel of exampleChannels) {
      this.set(channel.id, channel)
    }
  }

  setMany(channels: Record<string, Channel>): void {
    Object.entries(channels).forEach(([key, channel]) => {
      this.set(key, channel);
    });
  }

  getMany(keys: string[]): Record<string, Channel> {
    return keys.reduce((acc, key) => {
      const message = this.get(key);
      if (message) {
        acc[key] = message;
      }
      return acc;
    }, {} as Record<string, Channel>);
  }

  getAll(): Record<string, Channel> {
    return this.state;
  }

  getOrSet(key: string,channel: Channel): Channel {
    return this.get(key) || this.set(key, channel);
  }
}