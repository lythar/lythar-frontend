"use client";

import ChannelSidebar from "@/components/core/sidebar/channel/channel-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <ChannelSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
