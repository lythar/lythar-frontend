import { Input } from "@/components/ui/input";
import { Channel, StoreKeys } from "@/types/globals";
import { FC, FormEvent, useState } from "react";
import { useStore } from "../wrappers/stores-provider";
import { MessageStore } from "@/stores/message-store";

interface MessageInputProps {
  currentChannel: Channel;
}

const MessageInput: FC<MessageInputProps> = ({ currentChannel }) => {
  const [messageContent, setMessageContent] = useState("");
  const messageStore = useStore(StoreKeys.MessageStore);

  const [n, sn] = useState(10);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    sn(n + 1);
    messageStore?.set(n.toString(), {
      id: n.toString(),
      channelId: currentChannel.id,
      userId: "1",
      content: messageContent,
      createdAt: new Date().toISOString(),
    });

    setMessageContent("");
  };

  return (
    <div className="py-2 px-5 relative shrink-0 -mt-[8px]">
      <form onSubmit={sendMessage}>
        <Input
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          className="bg-sidebar rounded-xl h-10"
          placeholder={`Napisz na #${currentChannel.name}`}
        />
      </form>
    </div>
  );
};

export default MessageInput;
