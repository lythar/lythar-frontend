import { FC, useState } from "react";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@globals";
import ChannelLinksWrapper from "./channel-links-wrapper";
import { useDeviceContext } from "@/components/device-provider";
import { useSwipeable } from "react-swipeable";
import { MdOutlineClose } from "react-icons/md";
import SidebarContents from "./sidebar-contents";

interface ChannelSidebar {}

const ChannelSidebar: FC<ChannelSidebar> = () => {
  const { isMobile, toggleSidebar, isSidebarOpen } = useDeviceContext();
  const orgStore = useStore(StoreKeys.OrganizationStore);
  const swipe = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile && isSidebarOpen) {
        toggleSidebar();
      }
    },
  });

  return (
    <>
      {isMobile && isSidebarOpen && (
        <div
          className="z-10 bg-black opacity-50 h-screen w-screen fixed"
          onClick={toggleSidebar}
          {...swipe}
        ></div>
      )}
      <div
        className={`
      ${
        isMobile
          ? `fixed z-20 duration-250 transition-all ease-out-expo ${
              isSidebarOpen ? "translate-x-0" : " -translate-x-[100%]"
            }`
          : "relative"
      }
    `}
      >
        <div className="h-[calc(100svh)] md:h-screen w-[15rem] bg-sidebar-secondary flex flex-col relative">
          <div className="border-border h-[3.25rem] flex items-center justify-between md:justify-normal px-3">
            <h1 className="font-semibold">{orgStore.get("ORG_NAME")}</h1>
            {isMobile && (
              <button onClick={toggleSidebar}>
                <MdOutlineClose size={24} />
              </button>
            )}
          </div>
          <SidebarContents />
        </div>
      </div>
    </>
  );
};

export default ChannelSidebar;
