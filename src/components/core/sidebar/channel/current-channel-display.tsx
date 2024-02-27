import { useDeviceContext } from "@/components/device-provider";
import { Channel, StoreKeys } from "@/types/globals";
import { FaHashtag } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import UsersSidebar from "../users/mobile/users-sidebar.mobile";
import { UserMinus, UserPlus } from "lucide-react";
import ChannelPrivateAddMember from "./channel-private-add-member";
import { useStore } from "../../wrappers/stores-provider";
import ChannelPrivateRemoveMember from "./channel-private-remove-member";

interface CurrentChannelDisplayProps {
  currentChannel: Channel;
}

const CurrentChannelDisplay: React.FC<CurrentChannelDisplayProps> = ({
  currentChannel,
}) => {
  const accountStore = useStore(StoreKeys.AccountStore);
  const { isMobile, toggleSidebar, toggleUserTab, userTabOpen } =
    useDeviceContext();

  return (
    <div className="md:m-2 rounded-md bg-popover-secondary border-border min-h-14 md:min-h-10 flex items-center justify-between">
      <div className="flex items-center pl-4 gap-2">
        {isMobile && (
          <button onClick={toggleSidebar}>
            <GiHamburgerMenu size={20} className="mr-3" />
          </button>
        )}
        <FaHashtag size={20} className="" />
        <h1 className="text font-medium">{currentChannel?.name}</h1>
        <p className="text-sm text-muted-foreground">
          {currentChannel?.description}
        </p>
      </div>
      <div className="flex gap-2">
        {currentChannel.isPublic
          ? null
          : accountStore.get("isAdmin") && (
              <>
                <ChannelPrivateAddMember currentChannel={currentChannel}>
                  <UserPlus size={20} className="mr-3" />
                </ChannelPrivateAddMember>
                <ChannelPrivateRemoveMember currentChannel={currentChannel}>
                  <UserMinus size={20} className="mr-3" />
                </ChannelPrivateRemoveMember>
              </>
            )}
        {isMobile ? (
          <UsersSidebar currentChannel={currentChannel}>
            <button>
              <span
                onClick={toggleUserTab}
                className={
                  userTabOpen
                    ? "text-foreground-variant "
                    : "text-muted-foreground"
                }
              >
                <FaUsers size={20} className="mr-3" />
              </span>
            </button>
          </UsersSidebar>
        ) : (
          <button>
            <span
              onClick={toggleUserTab}
              className={
                userTabOpen
                  ? "dark:text-primary-foreground "
                  : "text-muted-foreground"
              }
            >
              <FaUsers size={20} className="mr-3" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrentChannelDisplay;
