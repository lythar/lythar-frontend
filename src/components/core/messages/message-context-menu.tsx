import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn, copyToClipboard } from "@/lib/utils";
import { Message, StoreKeys } from "@/types/globals";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Copy, Edit, Trash } from "lucide-react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import MessageDeleteModal from "./message-delete-modal";
import { useRef, useState } from "react";
import { EditingData } from "./message-view";
import { useStore } from "../wrappers/stores-provider";

function MessageContextMenu({
  message,
  editingData,
  setIsEditingData,
  setIsHovered,
  isHovered,
  contextMenuOpen,
  setContextMenuOpen,
}: {
  message: Message;
  editingData: EditingData;
  setIsEditingData: (data: EditingData) => void;
  setIsHovered: (hovered: boolean) => void;
  isHovered: boolean;
  contextMenuOpen: boolean;
  setContextMenuOpen: (open: boolean) => void;
}) {
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const accountStore = useStore(StoreKeys.AccountStore);
  const dropdownTriggerRef = useRef<null | HTMLButtonElement>(null);
  const focusRef = useRef<null | HTMLButtonElement>(null);

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open);
    if (open === false) {
      setContextMenuOpen(false);
    }
  };

  return (
    <DropdownMenu
      open={contextMenuOpen}
      onOpenChange={setContextMenuOpen}
      modal={false}
    >
      <DropdownMenuTrigger asChild>
        <button
          // ref={dropdownTriggerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            `absolute right-0 -translate-x-1/2 -top-2 z-[5] w-8 h-8 bg-sidebar border-[1px] border-solid cursor-pointer select-none flex items-center rounded-lg`,
            isHovered || contextMenuOpen ? "visible" : "invisible"
          )}
        >
          <BiDotsVerticalRounded size={20} className="w-8" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        hidden={hasOpenDialog}
        onCloseAutoFocus={(e) => {
          if (focusRef.current) {
            focusRef.current.focus();
            focusRef.current = null;
            e.preventDefault();
          }
        }}
        className="p-2 space-y-0.5"
        side="left"
        sideOffset={10}
      >
        <MessageContextMenuItem
          icon={<Copy size={20} />}
          action={() => copyToClipboard(message.content)}
        >
          Kopiuj tekst
        </MessageContextMenuItem>
        {accountStore.get("id") === message.author.id && (
          <MessageContextMenuItem
            icon={<Edit size={20} />}
            action={() =>
              setIsEditingData({
                messageId: message.messageId,
                content: message.content,
              })
            }
          >
            Edytuj wiadomość
          </MessageContextMenuItem>
        )}

        <MessageDeleteModal
          handleDialogItemOpenChange={handleDialogItemOpenChange}
          handleDialogItemSelect={handleDialogItemSelect}
          message={message}
        >
          <MessageContextMenuItem
            icon={<Trash size={20} />}
            rootClassName="text-red-600 hover:bg-red-700 hover:text-white"
          >
            Usuń
          </MessageContextMenuItem>
        </MessageDeleteModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MessageContextMenuItem({
  children,
  icon,
  className,
  rootClassName,
  action,
}: {
  children: React.ReactNode;
  icon: any;
  className?: string;
  rootClassName?: string;
  action?: () => void;
}) {
  return (
    <DropdownMenuItem className="bg-transparent focus:bg-transparent p-0">
      <div
        onClick={action}
        className={cn(
          "p-[0.125rem] hover:bg-muted-hover  hover:text-foreground-variant rounded-sm cursor-pointer",
          rootClassName
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between w-40 px-1.5 py-[0.125rem]"
          )}
        >
          <button
            className={cn(
              "block w-full text-left text-xs font-semibold",
              className
            )}
          >
            {children}
          </button>
          {icon}
        </div>
      </div>
    </DropdownMenuItem>
  );
}

export default MessageContextMenu;
