import { Suspense } from "react";
import ConversationLink from "./conversation-link";
import LoadingOverlayFallback from "../../wrappers/loading-overlay-fallback";

import { StoreKeys } from "@/types/globals";
import { useStore } from "../../wrappers/stores-provider";

interface ConversationLinksWrapperProps {}

const ConversationLinksWrapper: React.FC<
  ConversationLinksWrapperProps
> = () => {
  const channelStore = useStore(StoreKeys.ChannelStore);
  const directMessages = Object.entries(channelStore.getAll()).filter(
    ([, channel]) => channel.isDirectMessages
  );

  return (
    <div className="flex flex-col px-2 gap-[2px]">
      {directMessages.map(([, conversation]) => {
        return (
          <Suspense
            fallback={<LoadingOverlayFallback />}
            key={`conversation-${conversation.channelId}`}
          >
            <ConversationLink {...conversation} />
          </Suspense>
        );
      })}
    </div>
  );
};

export default ConversationLinksWrapper;
