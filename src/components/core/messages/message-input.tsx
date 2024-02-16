import { Input } from "@/components/ui/input";
import { Channel, StoreKeys } from "@/types/globals";
import { FC, FormEvent, useEffect, useState } from "react";
import { useStore } from "../wrappers/stores-provider";
import { MessageStore } from "@/stores/message-store";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { logDebug } from "../wrappers/debug-logger-bridge";
import { Send } from "lucide-react";

interface MessageInputProps {
  currentChannel: Channel;
}

const MessageInput: FC<MessageInputProps> = ({ currentChannel }) => {
  const [messageContent, setMessageContent] = useState("");
  const messageStore = useStore(StoreKeys.MessageStore);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (messageContent.length === 0) return;

    messageStore.sendMessage(messageContent, currentChannel);

    setMessageContent("");
  };

  return (
    <div className="py-2 px-2 relative shrink-0 -mt-[8px]">
      <form onSubmit={sendMessage} className="relative">
        <div className="flex items-center">
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
            onChange={(e) => {
              if (e.target.value.length < 2000)
                setMessageContent(e.target.value);
            }}
            className="bg-sidebar rounded-sm min-h-0 resize-none py-2 focus-visible:outline-none focus-visible:ring-0 relative"
            placeholder={`Napisz na #${currentChannel.name}`}
          />
          <button className="px-4 text-primary-foreground ">
            <Send size={20} />
          </button>
        </div>

        {messageContent.length > 1500 ? (
          <span
            className={cn(
              "absolute -top-8 left-0 bg-sidebar px-2 rounded-lg border-2 border-solid border-input",
              messageContent.length > 1850
                ? " text-red-600"
                : "text-muted-foreground"
            )}
          >
            {2000 - messageContent.length}
          </span>
        ) : null}
      </form>
    </div>
  );
};

export default MessageInput;
