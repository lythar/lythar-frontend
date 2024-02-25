"use client";

import SharedSidebar from "@/components/core/sidebar/shared/shared-sidebar";
import { useStore } from "@/components/core/wrappers/stores-provider";
import { StoreKeys } from "@/types/globals";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messageStore = useStore(StoreKeys.MessageStore);
  messageStore;

  return (
    <div className="flex">
      <SharedSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
