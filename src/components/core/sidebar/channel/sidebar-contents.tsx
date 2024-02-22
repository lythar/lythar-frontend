import ChannelLinksWrapper from "./channel-links-wrapper";
import ChannelCreateModal from "./channel-create-modal";

interface SidebarContentsProps {}

export default function SidebarContents({}: SidebarContentsProps) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between pr-3 text-secondary-foreground mb-2">
        <h1 className="uppercase font-bold  text-xs px-2">Kanały</h1>
        <ChannelCreateModal />
      </div>

      <ChannelLinksWrapper />
    </div>
  );
}
