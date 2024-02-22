import { Channel, Message, StoreKeys, User } from "@/types/globals";
import Store from "./base-store";
import client from "@/lib/api-client";
import { messageEventTypes } from "@/components/core/websocket/events/message-events";

export class MessageStore extends Store<Message, number> {
  public isFetchingOlderMessages = false;
  public override storeName = StoreKeys.MessageStore;

  public async fetchMessages(
    channelId: number,
    before?: number,
    isFetchingOlderMessages = false,
    initialFetch = false
  ) {
    if (initialFetch) await new Promise((resolve) => setTimeout(resolve, 300));
    this.isFetchingOlderMessages = isFetchingOlderMessages;
    const messages = await client.GET("/channels/api/{channelId}/messages", {
      params: {
        path: {
          channelId,
        },
        query: {
          Before: before,
          Limit: 50,
        },
      },
    });

    if (messages.error) {
      throw new Error("Failed to fetch messages");
    } else {
      const obj: Record<string, Required<Message>> = {};
      messages.data.forEach((message) => {
        obj[message.messageId!] = message as Required<Message>;
      });
      this.setMany(obj);
      if (!isFetchingOlderMessages) this.emit("INIT_MESSAGES_LOADED");

      return messages.data.length;
    }
  }

  // public removeMessagesOutsideLimit(channelId: number) {
  //   if (this.isFetchingOlderMessages) {
  //     if (
  //       Object.entries(this.getAll()).length >
  //       this.MAX_MESSAGES_LOADED_PER_CHANNEL +
  //         this.MAX_MESSAGES_LOADED_PER_CHANNEL_DEBOUNCE
  //     ) {
  //       const keys = Object.keys(this.getFromChannel(channelId));
  //       const keysToRemove = keys.slice(
  //         this.MAX_MESSAGES_LOADED_PER_CHANNEL_DEBOUNCE
  //       );
  //       keysToRemove.forEach((key) => {
  //         this.remove(parseInt(key));
  //       });
  //     }

  //     return;
  //   }
  //   const messages = this.getFromChannel(channelId);
  //   const keys = Object.keys(messages);
  //   if (keys.length > this.MAX_MESSAGES_LOADED_PER_CHANNEL) {
  //     console.log("removing excess messages");
  //     const keysToRemove = keys.slice(
  //       0,
  //       keys.length - this.MAX_MESSAGES_LOADED_PER_CHANNEL
  //     );
  //     keysToRemove.forEach((key) => {
  //       this.remove(parseInt(key));
  //     });
  //   }
  // }

  constructor() {
    super();

    this.on(messageEventTypes.NewMessage, (msg: Message) => {
      this.set(msg.messageId, msg);
      // this.removeMessagesOutsideLimit(msg.channelId);
    });
  }

  public setMany(messages: Record<number, Message>): void {
    for (const [k, v] of Object.entries(messages).reverse() as unknown as [
      number,
      Message
    ][]) {
      if (!this.isFetchingOlderMessages) this.emit("CAN_SCROLL_TO_BOTTOM");
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

  public async sendMessage(message: string, currentChannel: Channel) {
    this.isFetchingOlderMessages = false;
    this.emit("CAN_SCROLL_TO_BOTTOM");
    const serverResponse = await client.POST(
      "/channels/api/{channelId}/messages",
      {
        params: {
          path: {
            channelId: currentChannel.channelId,
          },
        },
        body: { content: message },
      }
    );

    if (serverResponse.response.status !== 200) {
      console.error("Error sending message", serverResponse);
    }
  }
}
