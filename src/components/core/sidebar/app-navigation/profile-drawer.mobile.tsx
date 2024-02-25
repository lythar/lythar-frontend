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
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";
import { FaCog } from "react-icons/fa";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@/types/globals";

interface SidebarProfileDropdownProps {}

const SidebarProfileDrawer: FC<SidebarProfileDropdownProps> = () => {
  const router = useRouter();
  const accountStore = useStore(StoreKeys.AccountStore);
  const data = useDataLayout();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex flex-col items-center justify-center w-[60px]  gap-[2px]">
          <Avatar className="w-7 h-7 text-xs">
            <AvatarImage
              src={`http://${process.env.NEXT_PUBLIC_API_URL}${accountStore.get(
                "avatarUrl"
              )}`}
            />
            <AvatarFallback className="cursor-pointer">
              {getInitials(`${data?.name} ${data?.lastName || ""}`)}
            </AvatarFallback>
          </Avatar>
          <span className="text-[0.65rem] font-semibold text-muted-foreground">
            Ty
          </span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="outline-none z-50">
        <DrawerHeader>
          <DrawerTitle>Moje konto</DrawerTitle>
        </DrawerHeader>

        <DrawerFooter className="gap-0 !first:rounded-b-none overflow-hidden">
          <DrawerClose asChild>
            <Button
              className="bg-sidebar h-14 rounded-xl shadow-sm shadow-accent"
              onClick={() => router.push("/app/settings")}
            >
              <div className="flex justify-between items-center w-full  text-accent-foreground dark:text-muted-foreground">
                <span className=" text-xs font-bold">Ustawienia</span>
                <FaCog size={24} />
              </div>
            </Button>
          </DrawerClose>
          <Separator className="my-3 bg-muted-foreground" />
          <Button
            className="bg-sidebar h-14 rounded-xl shadow-sm shadow-accent"
            onClick={() => router.push("/logout")}
          >
            <div className="flex justify-between items-center w-full text-accent-foreground dark:text-muted-foreground">
              <span className=" text-xs font-bold ">Wyloguj się</span>
              <LogOutIcon size={24} />
            </div>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarProfileDrawer;
