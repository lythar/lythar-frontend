"use client";
import client from "@/lib/api-client";
import { Channel, StoreKeys } from "../types/globals";
import Store from "./base-store";
import { ChannelCreateModalValues } from "@/components/core/sidebar/channel/channel-create-modal";

export class ChannelStore extends Store<Channel, number> {
  public override storeName: StoreKeys = StoreKeys.ChannelStore

  async initialFetch() {
    const currentChannels = await client.GET("/channels/api/list")

    if (currentChannels.error) {
      throw new Error("Failed to fetch channels")
    } else {
      const obj: Record<string, Required<Channel>> = {}
      currentChannels.data.forEach((channel) => {
        obj[channel.channelId!] = channel as Required<Channel>
      })
      this.setMany(obj)
      this.emit("LOAD_COMPLETE")
    }
  }

  public constructor() {
    super()
  }

  createChannel = async (channel: ChannelCreateModalValues) => {
    const newChannel = await client.POST("/channels/api/create", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: channel,
    })

    if (newChannel.error) {
      throw new Error("Failed to create channel")
    } else {
      console.log(newChannel.data)
      this.set(newChannel.data.channelId!, newChannel.data as Required<Channel>)
    }
  }


  setMany(channels: Record<number, Channel>): void {
    for (const [k,v] of Object.entries(channels) as unknown as [number, Channel][]) {
      this.set(k, v)
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