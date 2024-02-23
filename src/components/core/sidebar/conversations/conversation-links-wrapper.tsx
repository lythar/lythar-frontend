// import { Suspense } from "react";
// import ConversationLink from "./ConversationLink";
// import LoadingOverlayFallback from "../../wrappers/loading-overlay-fallback";

interface ConversationLinksWrapperProps {}

const ConversationLinksWrapper: React.FC<
  ConversationLinksWrapperProps
> = () => {
  return (
    <div className="flex flex-col px-2 gap-[2px]">
      {/* {Object.entries(conversationStore.getAll()).map(([, conversation]) => {
        return (
          <Suspense
            fallback={<LoadingOverlayFallback />}
            key={`conversation-${conversation.channelId}`}
          >
            <ConversationLink {...conversation} />
          </Suspense>
        );
      })} */}
    </div>
  );
};

export default ConversationLinksWrapper;
