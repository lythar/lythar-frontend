"use client";

import { FC } from "react";
import MainLinks from "./main-links";
import SidebarProfileDropdown from "./profile-dropdown";
import SidebarBranding from "@/components/branding/sidebar-branding";
import { PageLineSeperator } from "../../../ui/page-utils";
import { useDeviceContext } from "@/components/device-provider";
import { usePathname, useRouter } from "next/navigation";
import { IoCog } from "react-icons/io5";
import { logDebug } from "../../wrappers/debug-logger-bridge";

interface BaseSidebarProps {}

const BaseSidebar: FC<BaseSidebarProps> = () => {
  const { isMobile, isSidebarOpen } = useDeviceContext();
  const router = useRouter();
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
      className={`bg-sidebar w-full h-[4em] md:h-full md:w-16 flex flex-row md:flex-col justify-between items-center pb-2 md:pb-4 pt-2
    ${
      isMobile
        ? "fixed z-50 duration-250 transition-all ease-out-expo"
        : "relative z-[3]"
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
      {!isMobile && (
        <div className="flex flex-col items-center gap-4">
          <button onClick={() => router.push("/app/settings")}>
            <IoCog size={24} className="text-primary-foreground" />
          </button>
          <SidebarProfileDropdown />
        </div>
      )}
    </nav>
  );
};

export default BaseSidebar;
