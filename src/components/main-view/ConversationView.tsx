"use client";
import MessageInput from "@/components/core/messages/message-input";
import MessageView from "@/components/core/messages/message-view";
import CurrentChannelDisplay from "@/components/core/sidebar/channel/current-channel-display";
import { useRouter } from "next/navigation";
import { useStore } from "../core/wrappers/stores-provider";
import { Channel, StoreKeys } from "@/types/globals";
import { Suspense, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Icons } from "../ui/icons";

export default function ConversationView({ id }: { id: string }) {
  const router = useRouter();
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
        <p className="font-bold">Brak konwersacji</p>
      </div>
    );

  return <SuspenseConversationView currentChannel={currentChannel} />;
}

function SuspenseConversationView({
  currentChannel,
}: {
  currentChannel: Channel;
}) {
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
        </div>
      </div>
    </Suspense>
  );
}
