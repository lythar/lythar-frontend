import { useDeviceContext } from "@/components/device-provider";
import { cn, getApiUrl } from "@/lib/utils";
import { Channel, StoreKeys } from "@/types/globals";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Suspense, useMemo, useState } from "react";
import { FaHashtag } from "react-icons/fa6";
import LoadingOverlayFallback from "../../wrappers/loading-overlay-fallback";
import { useLastPosition } from "../../wrappers/last-position-provider";
import { FaCog } from "react-icons/fa";
import ChannelEditModal from "./channel-edit-modal";
import { useStore } from "../../wrappers/stores-provider";
import Image from "next/image";

function parseLocalizedNumber(number: number): string {
  const possibleChoices = ["osób", "osoby"];
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return possibleChoices[1];
  }
  if (
    lastDigit > 1 &&
    lastDigit < 5 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return possibleChoices[1];
  }
  return possibleChoices[0];
}

interface ChannelLinkProps extends Channel {}

const ChannelLink: FC<ChannelLinkProps> = (props: ChannelLinkProps) => {
  const pathname = usePathname();
  const accountId = +useStore(StoreKeys.AccountStore).get("id")!;
  const { changeLastPosition } = useLastPosition();
  const { isMobile, toggleSidebar } = useDeviceContext();
  const [isHovering, setIsHovering] = useState(false);
  const { channelId, name } = props;
  const isCreator = useMemo(
    () => props.creator?.id === accountId,
    [props.creator, accountId]
  );

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
            "flex items-center flex-1 gap-2 py-1 px-1 rounded-sm transition-all duration-250 ease-out-expo",
            isActive
              ? "bg-muted "
              : "text-secondary-foreground hover:bg-muted-hover hover:text-foreground-variant dark:hover:text-primary-foreground"
          )}
        >
          {props.iconUrl ? (
            <Image
              src={`${getApiUrl()}${props.iconUrl}`}
              alt={name}
              width={30}
              height={30}
              className="rounded-full"
            />
          ) : (
            <FaHashtag size={20} className="w-[30px]" />
          )}
          {props.isPublic && !props.isDirectMessages ? (
            <h1>{props.name}</h1>
          ) : (
            <div>
              <h1>{props.name}</h1>
              <p className="text-xs text-muted-foreground">
                {props.members.length}{" "}
                {parseLocalizedNumber(props.members.length)}
              </p>
            </div>
          )}
        </Link>
        {isCreator && (
          <ChannelEditModal
            isActive={isActive ? true : false}
            shouldRender={isHovering}
            channel={props}
          >
            <button className=" absolute right-0 top-0 bottom-0 flex items-center justify-center w-8 rounded-r-md cursor-pointer hover:text-accent-foreground transition-all duration-250 ease-out-expo">
              <FaCog />
            </button>
          </ChannelEditModal>
        )}
      </div>
    </Suspense>
  );
};

export default ChannelLink;
