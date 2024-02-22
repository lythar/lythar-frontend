import { FC } from "react";
import { useDataLayout } from "@/components/auth/data-layout-context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

interface SidebarProfileDropdownProps {}

const SidebarProfileDropdown: FC<SidebarProfileDropdownProps> = () => {
  const router = useRouter();
  const data = useDataLayout();

  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 text-xs">
          <AvatarImage src={data?.avatarUrl || ""} />
          <AvatarFallback className="cursor-pointer">
            {getInitials(`${data?.name!} ${data?.lastName || ""}`)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[12rem] opacity-90"
        side="right"
        sideOffset={10}
      >
        <DropdownMenuLabel>Moje Konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profil
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Skróty Klawiszowe
            <DropdownMenuShortcut>⌘/</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Wsparcie</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/logout")}>
          Wyloguj się
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarProfileDropdown;
