"use client";
import { FC } from "react";
import SidebarNavMobile from "./settings-nav-mobile";

interface SettingsModalProps {
  children?: React.ReactNode;
}

const sidebarNavItems = [
  {
    title: "Konto",
    href: "/app/settings/account",
  },
  {
    title: "Wyświetlanie",
    href: "/app/settings/foo",
  },
  {
    title: "Powiadomienia",
    href: "/app/settings/bar",
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
      <aside className="-mx-4 lg:w-1/5">
        <SidebarNavMobile items={sidebarNavItems} />
      </aside>
    </div>
  );
};

export default SettingsMobile;
