"use client";
import MessageInput from "@/components/app/core/message-input";
import MessageView from "@/components/app/core/message-view";
import { useStore } from "@/components/app/wrappers/stores-provider";
import { useDeviceContext } from "@/components/device-match-provider";
import { StoreKeys } from "@/types/globals";
import { useParams } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { FaHashtag } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

interface ChannelViewProps {}

const ChannelView: FC<ChannelViewProps> = () => {
  const id = useParams<{ id: string }>().id;
  const channelStore = useStore(StoreKeys.ChannelStore);
  const [currentChannel, setCurrentChannel] = useState(channelStore.get(id));

  const { isMobile, toggleSidebar } = useDeviceContext();

  useMemo(() => {
    setCurrentChannel(channelStore.get(id));
  }, [id, channelStore]);

  return (
    <div className="flex bg-background h-[100svh] flex-col">
      <div className="border-b-2 bg-sidebar border-border h-[3.25rem] flex items-center">
        <div className="flex items-center pl-4 gap-2 text-primary-foreground">
          {isMobile && (
            <button onClick={toggleSidebar}>
              <GiHamburgerMenu size={20} className="mr-3" />
            </button>
          )}
          <FaHashtag size={24} className="" />
          <h1 className="text font-semibold">{currentChannel.name}</h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col relative">
        <MessageView currentChannel={currentChannel} />
        <MessageInput currentChannel={currentChannel} />
      </div>
    </div>
  );
};

export default ChannelView;
