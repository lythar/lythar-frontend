import { FC, useState } from "react";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@globals";
import ChannelLinksWrapper from "./channel-links-wrapper";
import { useDeviceContext } from "@/components/device-match-provider";
import { useSwipeable } from "react-swipeable";
import { MdOutlineClose } from "react-icons/md";

interface ChannelSidebar {}

const ChannelSidebar: FC<ChannelSidebar> = () => {
  const { isMobile, toggleSidebar, isSidebarOpen } = useDeviceContext();
  const orgStore = useStore(StoreKeys.OrganizationStore);
  const channelStore = useStore(StoreKeys.ChannelStore);
  const swipe = useSwipeable({
    onSwipedLeft: () => {
      if (isMobile && isSidebarOpen) {
        toggleSidebar();
      }
    },
  });

  const [n, sn] = useState(3);

  const createChannel = () => {
    sn(n + 1);
    channelStore?.set(n.toString(), {
      id: n.toString(),
      name: `Channel ${n}`,
      description: `Description ${n}`,
    });
  };

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
        <div className="h-[calc(100svh)] md:h-screen w-[15rem] bg-sidebar  flex flex-col relative text-primary-foreground">
          <div className="border-b-[3px] shadow-sm border-border h-[3.25rem] flex items-center justify-between md:justify-normal px-3">
            <h1 className="font-semibold">{orgStore.get("ORG_NAME")}</h1>
            {isMobile && (
              <button onClick={toggleSidebar}>
                <MdOutlineClose size={24} />
              </button>
            )}
          </div>
          <div className="py-2">
            <h1 className="uppercase font-bold text-secondary-foreground text-xs px-2 mb-2">
              Kanały
            </h1>
            <ChannelLinksWrapper />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelSidebar;
