"use client";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import UsersSidebarContents from "../sidebar-contents";

export default function UsersSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[70%]">
        <div className="flex flex-col items-center justify-center">
          <DrawerHeader>Użytkownicy</DrawerHeader>
        </div>
        <UsersSidebarContents />
      </DrawerContent>
    </Drawer>
  );
}
