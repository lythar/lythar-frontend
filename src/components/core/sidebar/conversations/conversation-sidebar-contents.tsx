import ConversationCreateModal from "./conversation-create-modal";
import ConversationLinksWrapper from "./conversation-links-wrapper";

export default function ConversationSidebarContents() {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between px-3 text-foreground-variant mb-2">
        <ConversationCreateModal />
      </div>

      <ConversationLinksWrapper />
    </div>
  );
}
