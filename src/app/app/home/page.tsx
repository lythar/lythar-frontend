"use client";
import ChannelSidebar from "@/components/app/sidebar/channel/channel-sidebar";
import { useDeviceContext } from "@/components/device-match-provider";
import { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const { isMobile, toggleSidebar } = useDeviceContext();

  return (
    <div>
      <div className="border-b-2 bg-sidebar border-border h-[3.25rem] flex items-center">
        <div className="flex items-center pl-4 gap-2 text-primary-foreground">
          {isMobile && (
            <button onClick={toggleSidebar}>
              <GiHamburgerMenu size={20} className="mr-3" />
            </button>
          )}
          <h1 className="text font-semibold">Główna</h1>
        </div>
      </div>
      HOME_PAGE_ABOUT
    </div>
  );
};

export default HomePage;
