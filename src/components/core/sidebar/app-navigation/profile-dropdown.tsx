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
} from "@/components/ui/dropdown-menu";
import { useStore } from "../../wrappers/stores-provider";
import { StoreKeys } from "@/types/globals";

interface SidebarProfileDropdownProps {}

const SidebarProfileDropdown: FC<SidebarProfileDropdownProps> = () => {
  const router = useRouter();
  const accountStore = useStore(StoreKeys.AccountStore);
  const data = useDataLayout();

  const getInitials = (name: string) => {
    const nameArray = name.split(" ");
    return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 text-xs">
          <AvatarImage
            src={`http://${process.env.NEXT_PUBLIC_API_URL}${accountStore.get(
              "avatarUrl"
            )}`}
          />
          <AvatarFallback className="cursor-pointer">
            {getInitials(`${data?.name} ${data?.lastName || ""}`)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[12rem] opacity-90"
        side="right"
        sideOffset={10}
      >
        <DropdownMenuLabel>Moje Konto</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profil</DropdownMenuItem>
        </DropdownMenuGroup>
        <a
          href={
            "https://technical-documentation.pages.dev/instrukcje-uzytkowania/"
          }
          target="_blank"
        >
          <DropdownMenuItem>Wsparcie</DropdownMenuItem>
        </a>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/logout")}>
          Wyloguj się
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarProfileDropdown;
