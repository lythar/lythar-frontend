"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import UsersSidebarContents from "../sidebar-contents";
import { Channel } from "@/types/globals";

export default function UsersSidebar({
  children,
  currentChannel,
}: {
  children: React.ReactNode;
  currentChannel: Channel;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[70%]">
        <div className="flex flex-col items-center justify-center">
          <DrawerHeader>Użytkownicy</DrawerHeader>
        </div>
        <UsersSidebarContents currentChannel={currentChannel} />
      </DrawerContent>
    </Drawer>
  );
}
