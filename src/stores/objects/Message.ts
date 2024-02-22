import client from "@/lib/api-client";

export default class Message {
  static async sendMessage(channelId: number, message: string) {
    const serverResponse = await client.POST(
      "/channels/api/{channelId}/messages",
      {
        params: {
          path: {
            channelId: channelId,
          },
        },
        body: { content: message },
      }
    );

    if (serverResponse.response.status !== 200) {
      console.error("Error sending message", serverResponse);
    }
  }

  static async deleteMessage(channelId: number, messageId: number) {
    const serverResponse = await client.DELETE(
      "/channels/api/{channelId}/messages/{messageId}",
      {
        params: {
          path: {
            channelId,
            messageId,
          },
        },
      }
    );

    if (serverResponse.response.status !== 200) {
      console.error("Error deleting message", serverResponse);
    }
  }

  static async editMessage(
    channelId: number,
    messageId: number,
    newContent: string
  ) {
    const serverResponse = await client.PATCH(
      "/channels/api/{channelId}/messages/{messageId}",
      {
        params: {
          path: {
            channelId,
            messageId,
          },
        },
        body: { content: newContent },
      }
    );

    if (serverResponse.response.status !== 200) {
      console.error("Error editing message", serverResponse);
    }
  }
}
