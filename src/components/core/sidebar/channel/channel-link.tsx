import { useDeviceContext } from "@/components/device-provider";
import { cn } from "@/lib/utils";
import { Channel } from "@/types/globals";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Suspense, useState } from "react";
import { FaHashtag } from "react-icons/fa6";
import LoadingOverlayFallback from "../../wrappers/loading-overlay-fallback";
import { useLastPosition } from "../../wrappers/last-position-provider";
import { FaCog } from "react-icons/fa";
import ChannelEditModal from "./channel-edit-modal";

interface ChannelLinkProps extends Channel {}

const ChannelLink: FC<ChannelLinkProps> = (props: ChannelLinkProps) => {
  const pathname = usePathname();
  const { changeLastPosition } = useLastPosition();
  const { isMobile, toggleSidebar } = useDeviceContext();
  const [isHovering, setIsHovering] = useState(false);
  const { channelId, name } = props;

  const isActive = pathname.match(new RegExp(`^/app/home/${channelId}`));

  return (
    <Suspense fallback={<LoadingOverlayFallback />}>
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex relative"
      >
        <Link
          onClick={() => {
            changeLastPosition("home", channelId);
            if (isMobile) toggleSidebar();
          }}
          href={`/app/home/${channelId}`}
          className={cn(
            "flex items-center flex-1 gap-2 py-1 px-2 rounded-sm transition-all duration-250 ease-out-expo",
            isActive
              ? "bg-muted "
              : "text-secondary-foreground hover:bg-muted-hover hover:text-primary-foreground"
          )}
        >
          <FaHashtag className="" />
          <h1>{name}</h1>
        </Link>
        <ChannelEditModal
          isActive={isActive ? true : false}
          shouldRender={isHovering}
          channel={props}
        >
          <button className=" absolute right-0 top-0 bottom-0 flex items-center justify-center w-8 rounded-r-md cursor-pointer hover:text-accent-foreground transition-all duration-250 ease-out-expo">
            <FaCog />
          </button>
        </ChannelEditModal>
      </div>
    </Suspense>
  );
};

export default ChannelLink;
