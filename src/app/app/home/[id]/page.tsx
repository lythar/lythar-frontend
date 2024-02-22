"use client";
import MessageInput from "@/components/core/messages/message-input";
import MessageView from "@/components/core/messages/message-view";
import { useStore } from "@/components/core/wrappers/stores-provider";
import { useDeviceContext } from "@/components/device-provider";
import { StoreKeys } from "@/types/globals";
import { useParams, useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { FaHashtag } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";

interface ChannelViewProps {}

const ChannelView: FC<ChannelViewProps> = () => {
  const router = useRouter();
  const id = useParams<{ id: string }>().id;
  const channelStore = useStore(StoreKeys.ChannelStore);
  const messageStore = useStore(StoreKeys.MessageStore);
  const [currentChannel, setCurrentChannel] = useState(
    channelStore.get(Number(id))
  );

  const { isMobile, toggleSidebar } = useDeviceContext();

  useMemo(() => {
    if (Number(id) == -1) return router.push("/app/home");
    setCurrentChannel(channelStore.get(Number(id)));
    messageStore.fetchMessages(Number(id), undefined, false, true);
  }, [id, channelStore, messageStore, router]);

  return (
    <div className="flex h-[100svh] flex-col">
      <div className="md:m-2 rounded-md bg-popover-secondary border-border h-[3.25rem] flex items-center">
        <div className="flex items-center pl-4 gap-2">
          {isMobile && (
            <button onClick={toggleSidebar}>
              <GiHamburgerMenu size={20} className="mr-3" />
            </button>
          )}
          <FaHashtag size={20} className="" />
          <h1 className="text font-medium">{currentChannel.name}</h1>
        </div>
      </div>
      <div className="flex-auto flex flex-col relative overflow-hidden">
        <MessageView currentChannel={currentChannel} />
        <MessageInput currentChannel={currentChannel} />
      </div>
    </div>
  );
};

export default ChannelView;
