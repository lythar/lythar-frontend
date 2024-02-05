import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { IconType } from "react-icons";
import { Tooltip } from "react-tooltip";

export interface ExtendedLinkProps {
  pathname: string;
  Icon: IconType;
  href: string;
  displayName: string;
}

// const ExtendedLink: FC<ExtendedLinkProps> = ({
//   pathname,
//   Icon,
//   href,
//   displayName,
// }) => {
//   const isActive = pathname === href;

//   return (
//     <Link
//       href={href}
//       className={`relative flex flex-col w-full h-fit items-center transition-all  duration-250 ease-out-expo py-2  ${
//         isActive
//           ? "text-accent-secondary bg-accent border-l-2 border-accent-border"
//           : "text-muted-foreground border-l-2 border-transparent"
//       }`}
//     >
//       <Icon size={24} />
//       {/* <span className="text-[0.7rem] font-semibold">{displayName}</span> */}
//     </Link>
//   );
// };



const ExtendedLink: FC<ExtendedLinkProps> = ({
  pathname,
  Icon,
  href,
  displayName,
}) => {
  const isActive = pathname === href;

  return (<>
    <Tooltip id="test" className="!text-[0.75rem] !rounded-lg !py-[2px]" />

    <Link
      href={href}
      data-tooltip-id="test"
      data-tooltip-content={displayName}
      data-tooltip-delay-hide={2}
      data-tooltip-delay-show={1}
      className={cn(`relative flex flex-col items-center transition-all duration-250 ease-out-expo py-2 h-fit mx-[0.25rem] rounded-xl`,
        isActive
          ? "text-accent-secondary bg-accent"
          : "text-muted-foreground")}
    >
      <Icon size={20} />
      {/* <span className="text-[0.7rem] font-semibold">{displayName}</span> */}
    </Link>
    </>
  );
};

export default ExtendedLink;
