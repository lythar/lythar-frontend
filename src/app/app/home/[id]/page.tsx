"use client";
import MessageInput from "@/components/core/messages/message-input";
import MessageView from "@/components/core/messages/message-view";
import CurrentChannelDisplay from "@/components/core/sidebar/channel/current-channel-display";
import UsersSidebarRoot from "@/components/core/sidebar/users/users-sidebar-root";
import { useStore } from "@/components/core/wrappers/stores-provider";
import { Icons } from "@/components/ui/icons";
import { Channel, StoreKeys } from "@/types/globals";
import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FC, Suspense, useMemo, useState } from "react";

interface ChannelViewProps {}

const ChannelView: FC<ChannelViewProps> = () => {
  const router = useRouter();
  const id = useParams<{ id: string }>().id;
  const channelStore = useStore(StoreKeys.ChannelStore);
  const messageStore = useStore(StoreKeys.MessageStore);
  const [currentChannel, setCurrentChannel] = useState(
    channelStore.get(Number(id))
  );

  useMemo(() => {
    if (Number(id) == -1) return router.push("/app/home");
    setCurrentChannel(channelStore.get(Number(id)));
    messageStore.fetchMessages(Number(id), undefined, false, true);
  }, [id, channelStore, messageStore, router]);

  if (!currentChannel)
    return (
      <div className="text-accent w-full h-full flex flex-col items-center justify-center">
        <X className="h-16 w-16" />
        <p className="font-bold">Brak kanału</p>
      </div>
    );

  return <SuspenseChannelView currentChannel={currentChannel} />;
};

function SuspenseChannelView({ currentChannel }: { currentChannel: Channel }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <Icons.spinner className="animate-spin" />
        </div>
      }
    >
      <div className="flex h-[100svh] flex-col">
        <CurrentChannelDisplay currentChannel={currentChannel} />
        <div className="flex flex-auto overflow-hidden">
          <div className="flex-auto flex flex-col relative overflow-hidden">
            <MessageView currentChannel={currentChannel} />
            <MessageInput currentChannel={currentChannel} />
          </div>
          <UsersSidebarRoot />
        </div>
      </div>
    </Suspense>
  );
}

export default ChannelView;
