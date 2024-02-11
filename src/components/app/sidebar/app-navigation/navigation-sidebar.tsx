"use client";

import { FC } from "react";
import MainLinks from "./main-links";
import SidebarProfileDropdown from "./profile-dropdown";
import SidebarBranding from "@/components/branding/sidebar-branding";
import { PageLineSeperator } from "../../../ui/page-utils";
import { useDeviceContext } from "@/components/device-match-provider";
import { usePathname } from "next/navigation";

interface BaseSidebarProps {}

const BaseSidebar: FC<BaseSidebarProps> = () => {
  const { isMobile, isSidebarOpen } = useDeviceContext();
  const pathname = usePathname();

  let translation = "translate-y-0";

  if (isMobile) {
    if (!pathname.includes("/home") || pathname == "/app/home") {
      translation = "translate-y-0";
    } else {
      translation = isSidebarOpen ? "translate-y-0" : "translate-y-[100%]";
    }
  }

  return (
    <nav
      className={`bg-sidebar w-full h-[4em] md:h-full md:w-12 flex flex-row md:flex-col justify-between items-center pb-2 md:pb-4 pt-2
    ${
      isMobile
        ? "fixed z-50 duration-250 transition-all ease-out-expo"
        : "relative"
    }
    ${isMobile && translation}
    `}
    >
      <div className="flex w-full flex-row md:flex-col items-center">
        {!isMobile && (
          <>
            <SidebarBranding />
            <PageLineSeperator />
          </>
        )}
        <MainLinks />
      </div>
      {!isMobile && <SidebarProfileDropdown />}
    </nav>
  );
};

export default BaseSidebar;
