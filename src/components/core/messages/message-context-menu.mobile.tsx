"use client";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn, copyToClipboard } from "@/lib/utils";
import { Message as TMessage } from "@/types/globals";
import { Edit } from "lucide-react";
import { FaCopy, FaTrash } from "react-icons/fa6";
import { EditingData } from "./message-view";
import Message from "@/stores/objects/Message";

interface MessageContextMenuMobileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  message: TMessage;
  setEditingData: React.Dispatch<React.SetStateAction<EditingData>>;
}

interface ActionProps {
  message: TMessage;
  setEditingData: React.Dispatch<React.SetStateAction<EditingData>>;
  setOpen: (open: boolean) => void;
}

const MenuItems = [
  {
    icon: <FaCopy size={20} />,
    title: "Kopiuj Tekst",
    action: ({ message, setOpen }: ActionProps) => {
      copyToClipboard(message.content);
      setOpen(false);
    },
  },
  {
    icon: <Edit size={20} />,
    title: "Edytuj",
    action: ({ message, setEditingData, setOpen }: ActionProps) => {
      setEditingData({
        messageId: message.messageId,
        content: message.content,
      });
      setOpen(false);
    },
  },
  {
    icon: <FaTrash size={20} />,
    title: "Usuń",
    action: ({ message, setOpen }: ActionProps) => {
      Message.deleteMessage(message.channelId, message.messageId);
      setOpen(false);
    },
  },
];

export default function MessageContextMenuMobile({
  open,
  setOpen,
  message,
  setEditingData,
}: MessageContextMenuMobileProps) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="px-6 first:rounded-xl">
        <div className="h-6" />
        <div className="flex flex-col items-center">
          {MenuItems.map((item, i, arr) => (
            <MessageContextMenuMobileItem
              key={i}
              icon={item.icon}
              title={item.title}
              action={() => item.action({ message, setEditingData, setOpen })}
              className={cn(
                i === arr.length - 1
                  ? "rounded-b-xl border-t-[1px] border-bg-secondary"
                  : i === 0
                  ? "rounded-t-xl border-b-[1px] border-bg-secondary"
                  : "",
                item.title == "Usuń" ? "text-red-400" : ""
              )}
            />
          ))}
        </div>
        <div className="h-6" />
      </DrawerContent>
    </Drawer>
  );
}

interface MessageContextMenuMobileItemProps {
  icon: React.ReactNode;
  title: string;
  action: () => void;
  className?: string;
}

function MessageContextMenuMobileItem({
  icon,
  title,
  action,
  className,
}: MessageContextMenuMobileItemProps) {
  return (
    <div onClick={action} className={cn("bg-sidebar w-full h-14", className)}>
      <div className="flex justify-between items-center h-full px-4 w-full">
        <span className="text-sm font-bold">{title}</span>
        {icon}
      </div>
    </div>
  );
}
