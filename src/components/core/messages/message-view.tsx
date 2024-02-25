import { Channel, StoreKeys } from "@/types/globals";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../wrappers/stores-provider";
import Message from "./message";
import InfiniteScroll from "react-infinite-scroll-component";
import { Icons } from "@/components/ui/icons";
import { useDeviceContext } from "@/components/device-provider";
import MobileMessage from "./message.mobile";

interface MessageViewProps {
  currentChannel: Channel;
}

export type EditingData = {
  messageId: number | null;
  content: string;
};

const MessageView: FC<MessageViewProps> = ({ currentChannel }) => {
  const messageStore = useStore(StoreKeys.MessageStore);
  const messages = messageStore.getFromChannel(currentChannel.channelId);
  const { isMobile } = useDeviceContext();

  const [editingData, setEditingData] = useState<EditingData>({
    messageId: null,
    content: "",
  });

  const [hasMore, setHasMore] = useState(true);
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const [fetchCooldown, setFetchCooldown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initiallyLoaded) {
      messageStore
        .fetchMessages(currentChannel.channelId, undefined, false, true)
        .then((r) => {
          if (r !== 50) setHasMore(false);
          else setHasMore(true);
        });
    } else {
      setInitiallyLoaded(true);
    }
  }, [currentChannel.channelId, messageStore, initiallyLoaded]);

  const fetchMore = useCallback(() => {
    const messages = messageStore.getFromChannel(currentChannel.channelId);

    const messagesLength = Object.keys(messages || {}).length;

    if (messagesLength === 0 || !messages || fetchCooldown) return;

    const oldestMessageId = Math.min(...Object.keys(messages).map(Number));
    messageStore
      .fetchMessages(currentChannel.channelId, oldestMessageId, true)
      .then((r) => {
        setFetchCooldown(true);

        setTimeout(() => {
          setFetchCooldown(false);
        }, 500);

        if (r !== 50) setHasMore(false);
        else setHasMore(true);
      });
  }, [currentChannel, messageStore, fetchCooldown]);

  return (
    <div
      id="scrollableDiv"
      ref={ref}
      className="flex-1 overflow-y-scroll flex flex-col-reverse mb-4"
    >
      <InfiniteScroll
        dataLength={Object.keys(messages || {}).length}
        next={fetchMore}
        inverse={true}
        className="flex flex-col-reverse"
        hasMore={hasMore && !fetchCooldown}
        loader={
          <div className="w-full flex justify-center">
            <Icons.spinner className="animate-spin" />
          </div>
        }
        scrollableTarget="scrollableDiv"
        scrollThreshold={"400px"}
        initialScrollY={0}
        endMessage={
          <p className="px-4 text-2xl pt-40 w-full">
            <b className="text-foreground-variant font-medium">
              Witaj na{" "}
              <span className="text-foreground font-semibold">
                #{currentChannel.name}
              </span>
            </b>
            <p className="text-xl">To jest początek tego kanału</p>
            <div className="w-1/2 h-[1px] bg-accent-foreground my-4" />
          </p>
        }
      >
        {messages &&
          Object.entries(messages)
            .reverse()
            .map(([, message], id, arr) => {
              const previousMessage = arr[id + 1] ? arr[id + 1][1] : null;

              const shouldStack =
                previousMessage?.author.id === message.author.id;

              if (isMobile)
                return (
                  <MobileMessage
                    key={`${message.channelId}-${message.messageId}`}
                    {...message}
                    shouldStack={shouldStack}
                    setEditingData={setEditingData}
                    isEditing={editingData.messageId === message.messageId}
                  />
                );

              return (
                <Message
                  key={`${message.channelId}-${message.messageId}`}
                  {...message}
                  shouldStack={shouldStack}
                  setEditingData={setEditingData}
                  isEditing={editingData.messageId === message.messageId}
                />
              );
            })}
      </InfiniteScroll>
    </div>
  );
};

export default MessageView;
