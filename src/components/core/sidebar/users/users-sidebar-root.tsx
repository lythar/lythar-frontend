"use client";
import { useDeviceContext } from "@/components/device-provider";
import UsersSidebar from "./users-sidebar";

export default function UsersSidebarRoot() {
  const { isMobile, userTabOpen } = useDeviceContext();

  if (isMobile) return null;

  if (userTabOpen) {
    return <UsersSidebar />;
  }

  return null;
}
