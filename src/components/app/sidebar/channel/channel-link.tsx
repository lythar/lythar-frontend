import { useDeviceContext } from "@/components/device-match-provider";
import { cn } from "@/lib/utils";
import { Channel } from "@/types/globals";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { FaHashtag } from "react-icons/fa6";

interface ChannelLinkProps extends Channel {}

const ChannelLink: FC<ChannelLinkProps> = ({ id, name, description }) => {
  const pathname = usePathname();
  const { isMobile, toggleSidebar } = useDeviceContext();

  const isActive = pathname.match(new RegExp(`^/app/home/${id}`));

  return (
    <Link
      onClick={() => {
        // if (isMobile) toggleSidebar();
      }}
      href={`/app/home/${id}`}
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
  );
};

export default ChannelLink;
