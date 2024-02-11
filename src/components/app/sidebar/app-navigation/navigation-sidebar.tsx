"use client";

import { FC } from "react";
import MainLinks from "./main-links";
import SidebarProfileDropdown from "./profile-dropdown";
import SidebarBranding from "@/components/branding/sidebar-branding";
import { PageLineSeperator } from "../../../ui/page-utils";
import { useDeviceContext } from "@/components/device-match-provider";

interface BaseSidebarProps {}

const BaseSidebar: FC<BaseSidebarProps> = () => {
  const { isMobile } = useDeviceContext();

  return (
    <nav className="bg-sidebar w-full md:w-12 flex flex-row md:flex-col justify-between items-center pb-4 pt-2">
      <div className="flex w-full flex-row md:flex-col items-center">
        <SidebarBranding />
        {!isMobile && <PageLineSeperator />}
        <MainLinks />
      </div>
      <SidebarProfileDropdown />
    </nav>
  );
};

export default BaseSidebar;
