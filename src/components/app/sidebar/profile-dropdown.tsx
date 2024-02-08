import * as Dropdown from "@/components/ui/dropdown-menu";
import { FC } from "react";
import { useDataLayout } from "@/components/auth/data-layout-context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface SidebarProfileDropdownProps {}

const SidebarProfileDropdown: FC<SidebarProfileDropdownProps> = () => {
  const router = useRouter();
  const data = useDataLayout();

  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
  };

  return (
    <Dropdown.DropdownMenu>
      <Dropdown.DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 text-xs">
          <AvatarImage src={data.avatar_url} />
          <AvatarFallback className="cursor-pointer">
            {getInitials(data?.username!)}
          </AvatarFallback>
        </Avatar>
      </Dropdown.DropdownMenuTrigger>
      <Dropdown.DropdownMenuContent
        className="min-w-[12rem] opacity-90"
        side="right"
        sideOffset={10}
      >
        <Dropdown.DropdownMenuLabel>Moje Konto</Dropdown.DropdownMenuLabel>
        <Dropdown.DropdownMenuSeparator />
        <Dropdown.DropdownMenuGroup>
          <Dropdown.DropdownMenuItem>
            Profil
            <Dropdown.DropdownMenuShortcut>⇧⌘P</Dropdown.DropdownMenuShortcut>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuItem>
            Ustawienia
            <Dropdown.DropdownMenuShortcut>⌘,</Dropdown.DropdownMenuShortcut>
          </Dropdown.DropdownMenuItem>
          <Dropdown.DropdownMenuItem>
            Skróty Klawiszowe
            <Dropdown.DropdownMenuShortcut>⌘/</Dropdown.DropdownMenuShortcut>
          </Dropdown.DropdownMenuItem>
        </Dropdown.DropdownMenuGroup>
        <Dropdown.DropdownMenuSeparator />
        <Dropdown.DropdownMenuItem>Wsparcie</Dropdown.DropdownMenuItem>
        <Dropdown.DropdownMenuSeparator />
        <Dropdown.DropdownMenuItem onClick={() => router.push("/logout")}>
          Wyloguj się
        </Dropdown.DropdownMenuItem>
      </Dropdown.DropdownMenuContent>
    </Dropdown.DropdownMenu>
  );
};

export default SidebarProfileDropdown;
