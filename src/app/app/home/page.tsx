"use client";
import { useDeviceContext } from "@/components/device-provider";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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

      <DropdownMenu>
        <DropdownMenuTrigger> Dropdown Menu </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                Test
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>This is a modal.</DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HomePage;
