import { Channel, StoreKeys } from "@/types/globals";
import { FC, useEffect, useRef, useState } from "react";
import { useStore } from "../wrappers/stores-provider";
import Message from "./message";
import useIsInViewport from "@/hooks/useIsInViewport";
import { cn } from "@/lib/utils";

interface MessageViewProps {
  currentChannel: Channel;
}

const MessageView: FC<MessageViewProps> = ({ currentChannel }) => {
  const messageStore = useStore(StoreKeys.MessageStore);

  const messagesStartRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isFetchingOlderMessages, setIsFetchingOlderMessages] = useState(false);
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const isTopInViewport = useIsInViewport(messagesStartRef);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (isTopInViewport && initiallyLoaded) {
      if (isFetchingOlderMessages) return;

      const messageIds = Object.keys(messageStore.getAll());
      const oldestMessageId = Math.min(...messageIds.map(Number));

      setIsFetchingOlderMessages(true);

      messageStore.fetchMessages(
        currentChannel.channelId,
        oldestMessageId,
        true
      );

      setIsFetchingOlderMessages(false);
    }
  }, [
    initiallyLoaded,
    currentChannel.channelId,
    messageStore,
    isFetchingOlderMessages,
    isTopInViewport,
  ]);

  useEffect(() => {
    messageStore.on("INIT_MESSAGES_LOADED", () => {
      scrollToBottom();
      setTimeout(() => {
        setInitiallyLoaded(true);
      }, 500);
    });

    return () => {
      messageStore.off("INIT_MESSAGES_LOADED", scrollToBottom);
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
          <div className="min-h-0 max-h-full overflow-hidden list-none">
            <div
              className={cn("h-[16px]", initiallyLoaded ? "block" : "hidden")}
              ref={messagesStartRef}
            />
            {isFetchingOlderMessages && (
              <div className="text-center absolute text-gray-500">
                Loading...
              </div>
            )}
            <div className="mt-[1.5rem] mb-[0.5rem]" />
            {Object.entries(messageStore.getAll()).map(
              ([_, message], id, arr) => {
                if (message.channelId !== currentChannel.channelId) return null;
                const previousMessage =
                  arr[id - 1] &&
                  arr[id - 1][1].channelId === currentChannel.channelId
                    ? arr[id - 1][1]
                    : null;

                return (
                  <Message
                    key={`${message.channelId}-${message.messageId}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
