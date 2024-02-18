import { Channel, Message, StoreKeys, User } from "@/types/globals";
import Store from "./base-store";
import client from "@/lib/api-client";

export class MessageStore extends Store<Message, number> {
  public override storeName = StoreKeys.MessageStore;

  public async fetchMessages(channelId: number) {
    const messages = await client.GET("/channels/api/{channelId}/messages", {
      params: {
        path: {
          channelId
        }
      }
    });

    if (messages.error) {
      throw new Error("Failed to fetch messages");
    } else {
      const obj: Record<string, Required<Message>> = {};
      messages.data.forEach((message) => {
        obj[message.messageId!] = message as Required<Message>;
      });
      this.setMany(obj);
      this.emit("LOAD_COMPLETE");
    }
  }

  constructor() {
    super();
  }

  public setMany(messages: Record<number, Message>): void {
    for (const [k, v] of Object.entries(messages) as unknown as [number, Message][]) {
      this.set(k, v);
    }
  }

  public getFromChannel(channelId: number): Record<string, Message> {
    return Object.entries(this.getAll()).reduce((acc, [id, message]) => {
      if (message.channelId === channelId) {
        acc[id] = message;
      }
      return acc;
    }, {} as Record<string, Message>);
  }

  public async sendMessage(message: string, currentChannel: Channel, user: User) {
    const randomId = Math.floor(Math.random() * 1000);
    const newMessage: Message = {
        messageId: randomId,
        channelId: currentChannel.channelId,
        editedAt: null,
        content: message,
        sentAt: new Date().toISOString(),
        author: user
      }

    const serverResponse = await client.POST("/channels/api/{channelId}/messages", {
      params: {
        path: {
          channelId: currentChannel.channelId
        }
      },
      body: { content: message }
    })

    if (serverResponse.response.status === 200) {
      this.set(newMessage.messageId, newMessage);
    } else {
      console.error("Error sending message", serverResponse);
    }
  }
}