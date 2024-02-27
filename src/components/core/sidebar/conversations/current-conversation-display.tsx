import { useDeviceContext } from "@/components/device-provider";
import { User } from "@/types/globals";
import { GiHamburgerMenu } from "react-icons/gi";
import { getApiUrl, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CurrentConversationDisplayProps {
  targetUser: User;
}

const CurrentConversationDisplay: React.FC<CurrentConversationDisplayProps> = ({
  targetUser,
}) => {
  const { isMobile, toggleSidebar } = useDeviceContext();

  const conversationIcon =
    targetUser?.avatarUrl ||
    getInitials(`${targetUser?.name} ${targetUser?.lastName || ""}`);

  return (
    <div className="md:m-2 rounded-md bg-popover-secondary border-border min-h-14 md:min-h-fit md:py-2 flex items-center justify-between">
      <div className="flex items-center pl-4 gap-2">
        {isMobile && (
          <button onClick={toggleSidebar}>
            <GiHamburgerMenu size={20} className="mr-3" />
          </button>
        )}
        <Avatar>
          <AvatarImage
            src={`${getApiUrl()}${conversationIcon}`}
            alt={"Conversation icon"}
          />
          <AvatarFallback className="text-white">
            {conversationIcon}
          </AvatarFallback>
        </Avatar>
        <h1 className="text font-medium">
          {targetUser?.name} {targetUser.lastName}
        </h1>
      </div>
    </div>
  );
};

export default CurrentConversationDisplay;
