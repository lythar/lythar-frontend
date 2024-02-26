import Store from "./base-store";
import { QueuedMessage } from "@/types/globals";

export default class MessageQueueStore extends Store<QueuedMessage, number> {
  constructor() {
    super();
  }

  async addMessage(message: QueuedMessage) {
    this.set(message.channelId, message);
    this.emit("change");
  }

  async removeMessage(message: QueuedMessage) {
    this.remove(message.channelId);
    this.emit("change");
  }
}
