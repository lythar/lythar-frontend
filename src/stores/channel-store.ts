"use client";
import { Channel } from "@/lib/types";
import { useState } from "react";

export class ChannelStore {
  private static instance: ChannelStore;
  private storeState = useState<Record<string, Channel>>({} as Record<string, Channel>);

  static getInstance(): ChannelStore {
    if (!ChannelStore.instance) {
      ChannelStore.instance = new ChannelStore();
    }
    return ChannelStore.instance;
  }

  private constructor() {}

  setMany(channels: Record<string, Channel>): void {
    Object.entries(channels).forEach(([key, channel]) => {
      this.set(key, channel);
    });
  }

  set(key: string, channel: Channel): Channel {
    const [, setStore] = this.storeState;

    setStore((prev) => {
      return { ...prev, [key]: channel };
    });

    return channel;
  }

  get(key:string): Channel | undefined {
    const [store] = this.storeState;
    return store[key];
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
    const [store] = this.storeState;
    return store;
  }

  getOrSet(key: string,channel: Channel): Channel {
    return this.get(key) || this.set(key, channel);
  }
}