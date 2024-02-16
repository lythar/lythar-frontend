"use client";
import MessageInput from "@/components/core/messages/message-input";
import MessageView from "@/components/core/messages/message-view";
import { useStore } from "@/components/core/wrappers/stores-provider";
import { useDeviceContext } from "@/components/device-provider";
import { StoreKeys } from "@/types/globals";
import { useParams } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { FaHashtag } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

interface ChannelViewProps {}

const ChannelView: FC<ChannelViewProps> = () => {
  const id = useParams<{ id: string }>().id;
  const channelStore = useStore(StoreKeys.ChannelStore);
  const messageStore = useStore(StoreKeys.MessageStore);
  const [currentChannel, setCurrentChannel] = useState(
    channelStore.get(Number(id))
  );

  const { isMobile, toggleSidebar } = useDeviceContext();

  useMemo(() => {
    setCurrentChannel(channelStore.get(Number(id)));
    messageStore.fetchMessages(Number(id));
  }, [id, channelStore, messageStore]);

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
