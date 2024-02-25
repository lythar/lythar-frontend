import ChannelLinksWrapper from "./channel-links-wrapper";
import ChannelCreateModal from "./channel-create-modal";

export default function ChannelSidebarContents() {
  return (
    <div className="">
      <div className="flex items-center justify-between px-2 text-secondary-foreground mb-2">
        <ChannelCreateModal />
      </div>

      <ChannelLinksWrapper />
    </div>
  );
}
