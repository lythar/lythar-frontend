"use client";
import ChannelView from "@/components/main-view/ChannelView";
import ConversationView from "@/components/main-view/ConversationView";
import { useParams } from "next/navigation";

const MainView = () => {
  const id = useParams<{ id: string }>().id;

  if (id.startsWith("dm-")) {
    const channelId = id.split("-")[1];
    return <ConversationView id={channelId} />;
  }

  return <ChannelView id={id} />;
};

export default MainView;
