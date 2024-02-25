"use client";
import client from "@/lib/api-client";
import { Channel, StoreKeys } from "../types/globals";
import Store from "./base-store";
import { channelEventTypes } from "@/components/core/websocket/events/channel-events";

export class ChannelStore extends Store<Channel, number> {
  public override storeName: StoreKeys = StoreKeys.ChannelStore;

  async initialFetch() {
    const currentChannels = await client.GET("/channels/api/list");

    if (currentChannels.error) {
      throw new Error("Failed to fetch channels");
    } else {
      const obj: Record<string, Required<Channel>> = {};
      currentChannels.data.forEach((channel) => {
        obj[channel.channelId!] = channel as Required<Channel>;
      });
      this.setMany(obj);
      this.emit("change");
    }
  }

  public constructor() {
    super();

    this.on(channelEventTypes.ChannelCreated, this.onChannelCreate);
    this.on(channelEventTypes.ChannelDeleted, this.onChannelDelete);
  }

  private onChannelCreate = async (channel: Channel) => {
    this.set(channel.channelId!, channel);
    this.emit("change");
  };

  private onChannelDelete = async (channelId: number) => {
    this.remove(channelId);
  };

  setMany(channels: Record<number, Channel>): void {
    for (const [k, v] of Object.entries(channels) as unknown as [
      number,
      Channel
    ][]) {
      this.set(k, v);
    }
  }

  getMany(keys: number[]): Record<number, Channel> {
    return keys.reduce((acc, key) => {
      const message = this.get(key);
      if (message) {
        acc[key] = message;
      }
      return acc;
    }, {} as Record<number, Channel>);
  }

  getOrSet(key: number, channel: Channel): Channel {
    return this.get(key) || this.set(key, channel);
  }
}
