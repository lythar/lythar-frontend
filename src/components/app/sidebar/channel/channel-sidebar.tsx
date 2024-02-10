import { FC, useState } from "react";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@globals";
import ChannelLinksWrapper from "./channel-links-wrapper";

interface ChannelSidebar {}

const ChannelSidebar: FC<ChannelSidebar> = () => {
  const orgStore = useStore(StoreKeys.OrganizationStore);
  const channelStore = useStore(StoreKeys.ChannelStore);
  const [n, sn] = useState(3);

  const createChannel = () => {
    sn(n + 1);
    channelStore?.set(n.toString(), {
      id: n.toString(),
      name: `Channel ${n}`,
      description: `Description ${n}`,
    });
  };

  return (
    <div className="h-screen w-[15rem] bg-sidebar  flex flex-col relative text-primary-foreground">
      <div className="border-b-[3px] shadow-sm border-border h-[3.25rem] flex items-center">
        <h1 className="font-semibold px-3">{orgStore.get("ORG_NAME")}</h1>
        <button onClick={createChannel}>add</button>
      </div>
      <div className="py-2">
        <h1 className="uppercase font-bold text-secondary-foreground text-xs px-2 mb-2">
          Kanały
        </h1>
        <ChannelLinksWrapper />
      </div>
    </div>
  );
};

export default ChannelSidebar;
