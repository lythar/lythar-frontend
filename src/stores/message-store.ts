import { Message, StoreKeys } from "@/types/globals";
import Store from "./base-store";
import client from "@/lib/api-client";
import { messageEventTypes } from "@/components/core/websocket/events/message-events";

export class MessageStore extends Store<Message, number> {
  public isFetchingOlderMessages = false;
  public isBrowserFocused = true;
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
      this.emit("change");

      return messages.data.length;
    }
  }

  constructor() {
    super();

    document.addEventListener("visibilitychange", () => {
      this.isBrowserFocused = document.visibilityState === "visible";
    });

    this.on(messageEventTypes.NewMessage, (msg: Message) => {
      this.set(msg.messageId, msg);

      if (!this.isBrowserFocused) {
        const audio = new Audio("/Lythar_Notification_Sound.mp3");
        audio.play();
      }

      this.emit("change");
    });

    this.on(messageEventTypes.MessageEdited, this.onEditedMessage);
    this.on(messageEventTypes.MessageDeleted, this.onDeleteMessage);
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

  private async onDeleteMessage(messageId: number) {
    this.remove(messageId);
  }

  private async onEditedMessage(message: Message) {
    this.set(message.messageId, message);
    this.emit("change");
  }
}
