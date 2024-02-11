import { Channel, Message, StoreKeys } from "@/types/globals";
import Store from "./base-store";

export class MessageStore extends Store<Message> {
  public override storeName = StoreKeys.MessageStore;

  constructor() {
    super();
  }

  public getFromChannel(channelId: string): Record<string, Message> {
    return Object.entries(this.getAll()).reduce((acc, [id, message]) => {
      if (message.channelId === channelId) {
        acc[id] = message;
      }
      return acc;
    }, {} as Record<string, Message>);
  }

  public sendMessage(message: string, currentChannel: Channel) {
    const randomId = Math.floor(Math.random() * 1000);
    const newMessage = {
        id: randomId.toString(),
        channelId: currentChannel.id,
        userId: "1",
        content: message,
        createdAt: new Date().toISOString(),
    }
    this.set("incremental", newMessage)
  }
}