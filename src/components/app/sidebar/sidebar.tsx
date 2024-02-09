"use client";

import { FC } from "react";
import MainLinks from "./main-links";
import SidebarProfileDropdown from "./profile-dropdown";
import SidebarBranding from "@/components/branding/sidebar-branding";
import { PageLineSeperator } from "../../ui/page-utils";

interface BaseSidebarProps {}

const BaseSidebar: FC<BaseSidebarProps> = () => {
  return (
    <nav className="bg-sidebar w-12 flex flex-col justify-between items-center pb-4 pt-2 border-r-[1px]  border-input">
      <div className="flex w-full flex-col items-center">
        <SidebarBranding />
        <PageLineSeperator />
        <MainLinks />
      </div>
      <SidebarProfileDropdown />
    </nav>
  );
};

export default BaseSidebar;
