import { ChannelCreateModalValues } from "@/components/core/sidebar/channel/channel-create-modal";
import client from "@/lib/api-client";

export default class Channel {
  static async createChannel(channel: ChannelCreateModalValues) {
    const newChannel = await client.POST("/channels/api/create", {
      body: channel,
    });

    if (newChannel.error) {
      throw new Error("Failed to create channel");
    }

    return newChannel.data;
  }

  static async deleteChannel(channelId: number) {
    const deletedChannel = await client.DELETE(`/channels/api/{channelId}`, {
      params: {
        path: {
          channelId,
        },
      },
    });

    if (deletedChannel.error) {
      throw new Error("Failed to delete channel");
    }
  }
}
