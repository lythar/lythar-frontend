import { useDeviceContext } from "@/components/device-provider";
import { useSwipeable } from "react-swipeable";
import ChannelSidebarContents from "../channel/sidebar-contents";
import ConversationSidebarContents from "../conversations/conversation-sidebar-contents";
// import ConversationSidebarContents from "./conversation-sidebar-contents";

const SharedSidebar = () => {
  const { isMobile, toggleSidebar, isSidebarOpen } = useDeviceContext();
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
          ? `fixed z-20 w-screen duration-250 transition-all ease-out-expo ${
              isSidebarOpen ? "translate-x-0" : " -translate-x-[100%]"
            }`
          : "relative"
      }
    `}
      >
        <div className="h-[calc(100svh)] md:h-screen w-full md:w-[17.5rem] bg-sidebar-secondary flex flex-col relative">
          <div className="border-border h-[3.25rem] flex items-center justify-between md:justify-normal px-3">
            <h1 className="font-semibold">
              {process.env.NEXT_PUBLIC_ORGANIZATION_NAME}
            </h1>
          </div>
          <ChannelSidebarContents />
          <ConversationSidebarContents />
        </div>
      </div>
    </>
  );
};

export default SharedSidebar;
