"use client";
import { FC } from "react";
import ExtendedLink, { ExtendedLinkProps } from "./extended-link";
import { usePathname } from "next/navigation";
import { FaHouse, FaBell } from "react-icons/fa6";
import { IoChatbubbles } from "react-icons/io5";

interface LinksProps {}

const links: Omit<ExtendedLinkProps, "pathname">[] = [
  {
    Icon: FaHouse,
    href: "/app/home",
    displayName: "Główna",
  },
  {
    Icon: IoChatbubbles,
    href: "/app/conversations",
    displayName: "W. Pryw.",
  },
  {
    Icon: FaBell,
    href: "/app/activity",
    displayName: "Aktywność",
  },
];

const MainLinks: FC<LinksProps> = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full h-full gap-[0.25rem]">
      {links.map((link, index) => (
        <ExtendedLink key={index} pathname={pathname} {...link} />
      ))}
    </div>
  );
};

export default MainLinks;
