import { FC, Suspense } from "react";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@/types/globals";
import ChannelLink from "./channel-link";
import LoadingOverlayFallback from "../../wrappers/loading-overlay-fallback";

interface ChannelLinksWrapperProps {}

const ChannelLinksWrapper: FC<ChannelLinksWrapperProps> = () => {
  const channelStore = useStore(StoreKeys.ChannelStore);

  return (
    <div className="flex flex-col px-2 gap-[2px]">
      {Object.entries(channelStore.getAll()).map(([, channel]) => {
        return (
          <Suspense
            fallback={<LoadingOverlayFallback />}
            key={`channel-${channel.channelId}`}
          >
            <ChannelLink {...channel} />
          </Suspense>
        );
      })}
    </div>
  );
};

export default ChannelLinksWrapper;
