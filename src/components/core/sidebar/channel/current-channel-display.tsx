import { useDeviceContext } from "@/components/device-provider";
import { Channel } from "@/types/globals";
import { FaHashtag } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

interface CurrentChannelDisplayProps {
  currentChannel: Channel;
}

const CurrentChannelDisplay: React.FC<CurrentChannelDisplayProps> = ({
  currentChannel,
}) => {
  const { isMobile, toggleSidebar } = useDeviceContext();

  return (
    <div className="md:m-2 rounded-md bg-popover-secondary border-border min-h-10 flex items-center">
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
    </div>
  );
};

export default CurrentChannelDisplay;
