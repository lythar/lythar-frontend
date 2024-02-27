import { Suspense } from "react";
import ConversationLink from "./conversation-link";
import LoadingOverlayFallback from "../../wrappers/loading-overlay-fallback";

import { StoreKeys } from "@/types/globals";
import { useStore } from "../../wrappers/stores-provider";
import { getInitials } from "@/lib/utils";

interface ConversationLinksWrapperProps {}

const ConversationLinksWrapper: React.FC<
  ConversationLinksWrapperProps
> = () => {
  const channelStore = useStore(StoreKeys.ChannelStore);
  const accountStore = useStore(StoreKeys.AccountStore);
  const userStore = useStore(StoreKeys.UserStore);
  const directMessages = Object.entries(channelStore.getAll()).filter(
    ([, channel]) => channel.isDirectMessages
  );

  return (
    <div className="flex flex-col px-2 gap-[2px]">
      {directMessages.map(([, conversation]) => {
        const targetUser = userStore.get(
          conversation.members.filter(
            (member) => member != +accountStore.get("id")!
          )[0]
        );
        const conversationIcon =
          targetUser?.avatarUrl ||
          getInitials(`${targetUser?.name} ${targetUser?.lastName || ""}`);

        return (
          <Suspense
            fallback={<LoadingOverlayFallback />}
            key={`conversation-${conversation.channelId}`}
          >
            <ConversationLink
              targetUser={targetUser}
              iconURL={conversationIcon}
              {...conversation}
            />
          </Suspense>
        );
      })}
    </div>
  );
};

export default ConversationLinksWrapper;
