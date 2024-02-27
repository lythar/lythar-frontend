import { useDeviceContext } from "@/components/device-provider";
import { cn, getApiUrl } from "@/lib/utils";
import { Channel, User } from "@/types/globals";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Suspense } from "react";
import { FaHashtag } from "react-icons/fa6";
import LoadingOverlayFallback from "../../wrappers/loading-overlay-fallback";
import { useLastPosition } from "../../wrappers/last-position-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConversationLinkProps extends Channel {
  iconURL?: string;
  targetUser?: User;
}

const ConversationLink: FC<ConversationLinkProps> = (
  props: ConversationLinkProps
) => {
  const pathname = usePathname();
  const { changeLastPosition } = useLastPosition();
  const { isMobile, toggleSidebar } = useDeviceContext();
  const { channelId, name, iconURL, targetUser } = props;

  const isActive = pathname.match(new RegExp(`^/app/home/dm-${channelId}`));

  return (
    <Suspense fallback={<LoadingOverlayFallback />}>
      <div className="flex relative">
        <Link
          onClick={() => {
            changeLastPosition("conversation", channelId);
            if (isMobile) toggleSidebar();
          }}
          href={`/app/home/dm-${channelId}`}
          className={cn(
            "flex items-center flex-1 gap-2 py-1 px-2 rounded-sm transition-all duration-250 ease-out-expo",
            isActive
              ? "bg-muted "
              : "text-secondary-foreground hover:bg-muted-hover hover:text-foreground-variant dark:hover:text-primary-foreground"
          )}
        >
          {iconURL ? (
            <Avatar className="w-9 h-9">
              <AvatarImage src={`${getApiUrl()}${iconURL}`} alt={name} />
              <AvatarFallback className="text-white">{iconURL}</AvatarFallback>
            </Avatar>
          ) : (
            <FaHashtag />
          )}
          <h1>
            {targetUser?.name} {targetUser?.lastName || ""}
          </h1>
        </Link>
      </div>
    </Suspense>
  );
};

export default ConversationLink;
