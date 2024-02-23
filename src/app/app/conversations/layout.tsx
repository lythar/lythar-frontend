"use client";

import ConversationSidebar from "@/components/core/sidebar/conversations/conversation-sidebar";

export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <ConversationSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
