import { FC } from "react";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@/types/globals";
import ChannelLink from "./channel-link";

interface ChannelLinksWrapperProps {}

const ChannelLinksWrapper: FC<ChannelLinksWrapperProps> = () => {
  const channelStore = useStore(StoreKeys.ChannelStore);

  return (
    <div className="flex flex-col px-2 gap-[2px]">
      {Object.entries(channelStore.getAll()).map(([_, channel]) => {
        return <ChannelLink key={channel.id} {...channel} />;
      })}
    </div>
  );
};

export default ChannelLinksWrapper;
