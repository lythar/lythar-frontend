"use client";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { FC, useState } from "react";
import SidebarNavMobile from "./settings-nav-mobile";

interface SettingsModalProps {}

const sidebarNavItems = [
  {
    title: "Konto",
    href: "/app/settings/account",
  },
  {
    title: "Wyświetlanie",
    href: "/app/settings/account",
  },
  {
    title: "Powiadomienia",
    href: "/app/settings/account",
  },
];

const SettingsMobile: FC<SettingsModalProps> = () => {
  return (
    <div className=" space-y-6 min-w-full min-h-full  p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Ustawienia</h2>
        <p className="text-muted-foreground">
          Zarządzaj swoim kontem i ustaw swoje preferencje.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNavMobile items={sidebarNavItems} />
        </aside>
        {/* <div className="flex-1 lg:max-w-2xl">{children}</div> */}
      </div>
    </div>
  );
};

export default SettingsMobile;
