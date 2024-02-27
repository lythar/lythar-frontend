"use client";
import { useDeviceContext } from "@/components/device-provider";
import UsersSidebar from "./users-sidebar";
import { Channel } from "@/types/globals";

interface UsersSidebarRootProps {
  currentChannel?: Channel;
}

export default function UsersSidebarRoot({
  currentChannel,
}: UsersSidebarRootProps) {
  const { isMobile, userTabOpen } = useDeviceContext();

  if (isMobile) return null;

  if (userTabOpen) {
    return <UsersSidebar currentChannel={currentChannel!} />;
  }

  return null;
}
