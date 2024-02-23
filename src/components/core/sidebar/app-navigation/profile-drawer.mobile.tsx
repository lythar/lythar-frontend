import {
  Drawer,
  DrawerClose,
  DrawerContent,
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
import { IoCog } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";

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
          <AvatarImage src={data.avatarUrl || ""} />
          <AvatarFallback className="cursor-pointer">
            {getInitials(data?.name)}
          </AvatarFallback>
        </Avatar>
      </DrawerTrigger>
      <DrawerContent className="outline-none z-50">
        <DrawerHeader>
          <DrawerTitle>Moje konto</DrawerTitle>
        </DrawerHeader>

        <DrawerFooter className="gap-0 !first:rounded-b-none overflow-hidden">
          <DrawerClose asChild>
            <Button
              className="bg-sidebar h-14 rounded-xl"
              onClick={() => router.push("/app/settings")}
            >
              <div className="flex justify-between items-center w-full">
                <span className=" text-xs font-bold">Ustawienia</span>
                <IoCog size={24} />
              </div>
            </Button>
          </DrawerClose>
          <Separator className="my-3 bg-muted-foreground" />
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
