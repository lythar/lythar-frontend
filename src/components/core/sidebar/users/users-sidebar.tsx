"use client";
import UsersSidebarContents from "./sidebar-contents";

export default function UsersSidebar() {
  return (
    <div className="w-[17.5rem] bg-sidebar-secondary flex flex-col relative mb-2 mr-2 rounded-md">
      <div className="border-border h-[3.25rem] flex items-center justify-between md:justify-normal px-3">
        <h1 className="font-semibold">Użytownicy</h1>
      </div>
      <UsersSidebarContents />
    </div>
  );
}
