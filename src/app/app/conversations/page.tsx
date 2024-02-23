"use client";
import { useDeviceContext } from "@/components/device-provider";
import { FC } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface ConversationsPageProps {}

const ConversationPage: FC<ConversationsPageProps> = () => {
  const { isMobile, toggleSidebar } = useDeviceContext();

  return (
    <div className="h-full">
      {isMobile && (
        <div className="md:m-2 rounded-md bg-popover-secondary border-border min-h-10 flex items-center">
          <div className="flex items-center pl-4 gap-2">
            <button onClick={toggleSidebar}>
              <GiHamburgerMenu size={20} className="mr-3" />
            </button>
            <h1 className="text font-medium">Konwersacje</h1>
          </div>
        </div>
      )}

      <p className="h-full flex items-center justify-center text-xl font-bold text-center">
        Wybierz osobę z bocznego menu aby zacząć rozmowę
      </p>
    </div>
  );
};

export default ConversationPage;
