"use client";

import ChannelSidebar from "@/components/app/sidebar/channel/channel-sidebar";
import { useDeviceContext } from "@/components/device-match-provider";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

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
