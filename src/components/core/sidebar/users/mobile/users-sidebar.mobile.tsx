"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function UsersSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col items-center justify-center">
          <h1>Użytkownicy</h1>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
