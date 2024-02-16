import { useDeviceContext } from "@/components/device-provider";
import { cn } from "@/lib/utils";
import { Channel } from "@/types/globals";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Suspense } from "react";
import { FaHashtag } from "react-icons/fa6";
import LoadingOverlayFallback from "../../wrappers/loading-overlay-fallback";
import { useLastPosition } from "../../wrappers/last-position-provider";

interface ChannelLinkProps extends Channel {}

const ChannelLink: FC<ChannelLinkProps> = ({ channelId, name }) => {
  const pathname = usePathname();
  const { changeLastPosition } = useLastPosition();
  const { isMobile, toggleSidebar } = useDeviceContext();

  const isActive = pathname.match(new RegExp(`^/app/home/${channelId}`));

  return (
    <Suspense fallback={<LoadingOverlayFallback />}>
      <Link
        onClick={() => {
          changeLastPosition("home", channelId);
          if (isMobile) toggleSidebar();
        }}
        href={`/app/home/${channelId}`}
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded-sm transition-all duration-250 ease-out-expo",
          isActive
            ? "bg-muted "
            : "text-secondary-foreground hover:bg-muted-hover hover:text-primary-foreground"
        )}
      >
        <FaHashtag className="" />
        <h1>{name}</h1>
      </Link>
    </Suspense>
  );
};

export default ChannelLink;
