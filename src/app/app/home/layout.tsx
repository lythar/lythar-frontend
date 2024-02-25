"use client";

import SharedSidebar from "@/components/core/sidebar/shared/shared-sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SharedSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
