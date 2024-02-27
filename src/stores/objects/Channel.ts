import { ChannelCreateModalValues } from "@/components/core/sidebar/channel/channel-create-modal";
import client from "@/lib/api-client";
import { getApiUrl } from "@/lib/utils";
import { Channel as TChannel } from "@/types/globals";

export default class Channel {
  static async createChannel(channel: ChannelCreateModalValues) {
    const newChannel = await client.POST("/channels/api/create", {
      body: channel as TChannel,
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

  static async updateIcon(channelId: number, fileBuf: string, ext: string) {
    const response = await fetch(
      `${getApiUrl()}/channels/api/${channelId}/icon`,
      {
        method: "POST",
        headers: {
          "Content-Type": `image/${ext}`,
          Authorization: localStorage.getItem("token") || "",
        },
        body: fileBuf,
      }
    );

    const data = await response.json();
    const error =
      response.status !== 200
        ? { errorMessage: "Error updating avatar" }
        : undefined;

    if (error) {
      throw new Error((error as { errorMessage: string }).errorMessage);
    }

    return data;
  }

  static async addToChannel(channelId: number, accountId: number) {
    const response = await client.POST(`/channels/api/{channelId}/members`, {
      params: {
        path: {
          channelId,
        },
      },
      body: {
        members: [accountId],
      },
    });

    if (response.error) {
      throw new Error("Failed to add user to channel");
    }
  }

  static async removeFromChannel(channelId: number, accountId: number) {
    const response = await client.DELETE(
      `/channels/api/{channelId}/members/{memberId}`,
      {
        params: {
          path: {
            channelId,
            memberId: accountId,
          },
          body: {
            members: [accountId],
          },
        },
      }
    );

    if (response.error) {
      throw new Error("Failed to remove user from channel");
    }
  }
}
