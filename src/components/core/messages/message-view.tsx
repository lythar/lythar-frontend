import { Channel, Message as TMessage, StoreKeys } from "@/types/globals";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "../wrappers/stores-provider";
import Message from "./message";
import useIsInViewport from "@/hooks/useIsInViewport";
import { cn } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";

interface MessageViewProps {
  currentChannel: Channel;
}

const MessageView: FC<MessageViewProps> = ({ currentChannel }) => {
  const messageStore = useStore(StoreKeys.MessageStore);
  const messages = messageStore.getFromChannel(currentChannel.channelId);

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
        }, 1000);

        if (r !== 50) setHasMore(false);
        else setHasMore(true);
      });
  }, [currentChannel, messageStore, fetchCooldown]);

  return (
    <div
      id="scrollableDiv"
      ref={ref}
      className="flex-auto overflow-y-auto flex flex-col-reverse mb-4"
    >
      <InfiniteScroll
        dataLength={Object.keys(messages || {}).length}
        next={fetchMore}
        inverse={true}
        className="flex flex-col-reverse"
        hasMore={hasMore && !fetchCooldown}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        scrollThreshold={"400px"}
        initialScrollY={0}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Początek konwersacji</b>
          </p>
        }
      >
        {messages &&
          Object.entries(messages)
            .reverse()
            .map(([_, message], id, arr) => {
              const previousMessage = arr[id + 1] ? arr[id + 1][1] : null;

              const shouldStack =
                previousMessage?.author.id === message.author.id;

              console.log(shouldStack, previousMessage, message);

              return (
                <Message
                  key={`${message.channelId}-${message.messageId}`}
                  {...message}
                  shouldStack={shouldStack}
                />
              );
            })}
      </InfiniteScroll>
    </div>
  );
};

export default MessageView;
