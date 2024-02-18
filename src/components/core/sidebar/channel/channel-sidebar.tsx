import { FC, useState } from "react";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@globals";
import ChannelLinksWrapper from "./channel-links-wrapper";
import { useDeviceContext } from "@/components/device-provider";
import { useSwipeable } from "react-swipeable";
import { MdOutlineClose } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ChannelCreateModal from "./channel-create-modal";

interface ChannelSidebar {}

const ChannelSidebar: FC<ChannelSidebar> = () => {
  const { isMobile, toggleSidebar, isSidebarOpen } = useDeviceContext();
  const [createChannelDialogOpen, setCreateChannelDialogOpen] = useState(false);
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
          <div className="py-2">
            <div className="flex items-center justify-between pr-3 text-secondary-foreground mb-2">
              <h1 className="uppercase font-bold  text-xs px-2">Kanały</h1>
              <Dialog>
                <DialogTrigger asChild>
                  <button>
                    <Plus size={20} />
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <ChannelCreateModal />
                </DialogContent>
              </Dialog>
            </div>

            <ChannelLinksWrapper />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelSidebar;
