import { Channel, StoreKeys } from "@/types/globals";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useStore } from "../wrappers/stores-provider";
import Message from "./message";

interface MessageViewProps {
  currentChannel: Channel;
}

const MessageView: FC<MessageViewProps> = ({ currentChannel }) => {
  const messageStore = useStore(StoreKeys.MessageStore);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    messageStore.on("change", scrollToBottom);

    return () => {
      messageStore.off("change", scrollToBottom);
    };
  }, [messageStore]);

  return (
    <div className="relative flex flex-auto min-h-0 min-w-0 z-0">
      <div
        className="absolute top-0 bottom-0 left-0 right-0 overflow-x-hidedn overflow-y-scroll flex-auto box-border min-h-0"
        style={{ overflowAnchor: "none" }}
      >
        <div
          className="flex flex-col justify-end items-stretch min-h-full"
          style={{ overflowAnchor: "none" }}
        >
          <ol className="min-h-0 overflow-hidden list-none">
            <div className="h-[16px]" />
            <div className="mt-[1.5rem] mb-[0.5rem]" />
            {Object.entries(messageStore.getAll()).map(
              ([_, message], id, arr) => {
                if (message.channelId !== currentChannel.id) return null;
                const previousMessage =
                  arr[id - 1] && arr[id - 1][1].channelId === currentChannel.id
                    ? arr[id - 1][1]
                    : null;
                return (
                  <Message
                    key={`${message.channelId}-${message.id}`}
                    {...message}
                    previousMessage={previousMessage}
                  />
                );
              }
            )}
            <div
              className="block h-[30px] w-[1px] pointer-events-none"
              ref={messagesEndRef}
            />
          </ol>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
