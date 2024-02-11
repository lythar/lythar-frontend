import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FC } from "react";
import { useDataLayout } from "@/components/auth/data-layout-context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

interface SidebarProfileDropdownProps {}

const SidebarProfileDrawer: FC<SidebarProfileDropdownProps> = () => {
  const router = useRouter();
  const data = useDataLayout();

  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Avatar className="w-8 h-8 text-xs">
          <AvatarImage src={data.avatar_url} />
          <AvatarFallback className="cursor-pointer">
            {getInitials(data?.username!)}
          </AvatarFallback>
        </Avatar>
      </DrawerTrigger>
      <DrawerContent className="outline-none">
        <DrawerHeader>
          <DrawerTitle>Moje konto</DrawerTitle>
        </DrawerHeader>

        <DrawerFooter>
          <Button
            className="bg-sidebar h-14 rounded-xl"
            onClick={() => router.push("/logout")}
          >
            <div className="flex justify-between items-center w-full">
              <span className=" text-xs font-bold">Wyloguj się</span>
              <LogOutIcon size={24} />
            </div>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarProfileDrawer;
