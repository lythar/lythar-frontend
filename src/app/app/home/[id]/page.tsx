"use client";
import MessageInput from "@/components/core/messages/message-input";
import MessageView from "@/components/core/messages/message-view";
import CurrentChannelDisplay from "@/components/core/sidebar/channel/current-channel-display";
import { useStore } from "@/components/core/wrappers/stores-provider";
import { Icons } from "@/components/ui/icons";
import { Channel, StoreKeys } from "@/types/globals";
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

  return <SuspenseChannelView currentChannel={currentChannel} />;
};

function SuspenseChannelView({ currentChannel }: { currentChannel: Channel }) {
  return (
    <Suspense
      fallback={
        <div>
          <Icons.spinner className="animate-spin h-10 w-10" />
        </div>
      }
    >
      <div className="flex h-[100svh] flex-col">
        <CurrentChannelDisplay currentChannel={currentChannel} />
        <div className="flex-auto flex flex-col relative overflow-hidden">
          <MessageView currentChannel={currentChannel} />
          <MessageInput currentChannel={currentChannel} />
        </div>
      </div>
    </Suspense>
  );
}

export default ChannelView;
