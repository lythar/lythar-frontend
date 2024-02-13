import { Input } from "@/components/ui/input";
import { Channel, StoreKeys } from "@/types/globals";
import { FC, FormEvent, useState } from "react";
import { useStore } from "../wrappers/stores-provider";
import { MessageStore } from "@/stores/message-store";
import { Textarea } from "@/components/ui/textarea";

interface MessageInputProps {
  currentChannel: Channel;
}

const MessageInput: FC<MessageInputProps> = ({ currentChannel }) => {
  const [messageContent, setMessageContent] = useState("");
  const messageStore = useStore(StoreKeys.MessageStore);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const lastId = Object.keys(messageStore.getAll()).at(-1);
    const newId = lastId ? (parseInt(lastId) + 1).toString() : "0";

    messageStore?.set(newId, {
      id: newId,
      channelId: currentChannel.id,
      userId: "1",
      content: messageContent,
      createdAt: new Date().toISOString(),
    });

    console.log(messageStore?.getAll());

    setMessageContent("");
  };

  return (
    <div className="py-2 px-5 relative shrink-0 -mt-[8px]">
      <form onSubmit={sendMessage}>
        <Textarea
          ref={(el) => el?.focus()}
          rows={1.5}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage(e);
            }
          }}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          className="bg-sidebar rounded-xl min-h-0 resize-none focus-visible:outline-none"
          placeholder={`Napisz na #${currentChannel.name}`}
        />
      </form>
    </div>
  );
};

export default MessageInput;
