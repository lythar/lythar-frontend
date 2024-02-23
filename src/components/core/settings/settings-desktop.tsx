"use client";
import { FC } from "react";
import SidebarNav from "./settings-sidebar-nav-desktop";

interface SettingsModalProps {
  children: React.ReactNode;
}

const sidebarNavItems = [
  {
    title: "Konto",
    href: "/app/settings",
  },
  {
    title: "Wyświetlanie",
    href: "/app/settings/apperance",
  },
  {
    title: "Powiadomienia",
    href: "/app/settings/bar",
  },
];
const SettingsDesktop: FC<SettingsModalProps> = ({
  children,
}: SettingsModalProps) => {
  return (
    <div className="hidden space-y-6 min-w-full min-h-full  md:min-w-[60%] md:min-h-[30%]  p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Ustawienia</h2>
        <p className="text-muted-foreground">
          Zarządzaj swoim kontem i ustaw swoje preferencje.
        </p>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default SettingsDesktop;
