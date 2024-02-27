"use client";
import { Channel } from "@/types/globals";
import UsersSidebarContents from "./sidebar-contents";

interface UsersSidebarProps {
  currentChannel: Channel;
}

export default function UsersSidebar({ currentChannel }: UsersSidebarProps) {
  return (
    <div className="min-w-[17.5rem] bg-sidebar-secondary flex flex-col relative mb-2 mr-2 rounded-md">
      <div className="border-border h-[3.25rem] flex items-center justify-between md:justify-normal px-3">
        <h1 className="font-semibold">Użytkownicy</h1>
      </div>
      <UsersSidebarContents currentChannel={currentChannel} />
    </div>
  );
}
