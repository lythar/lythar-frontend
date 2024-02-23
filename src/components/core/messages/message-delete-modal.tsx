import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import DialogItem from "@/components/ui/dialog-item";
import { Message } from "@/types/globals";
import { getInitials } from "@/lib/utils";
import MessageMarkdownParser from "./message-markdown-parser";
import { default as OMessage } from "@/stores/objects/Message";

interface MessageDeleteModalProps {
  message: Message;
  children: React.ReactNode;
  handleDialogItemOpenChange: (open: boolean) => void;
  handleDialogItemSelect: () => void;
}

export default function MessageDeleteModal({
  message,
  children,
  handleDialogItemOpenChange,
  handleDialogItemSelect,
}: MessageDeleteModalProps) {
  return (
    <DialogItem
      triggerChildren={children}
      onSelect={handleDialogItemSelect}
      onOpenChange={handleDialogItemOpenChange}
    >
      <div>
        <h2 className="text-lg font-semibold">Usuwanie wiadomości</h2>
        <p>Czy na pewno chcesz usunąć tę wiadomość?</p>

        <div className="py-2 m-1">
          <div className="p-1 border-[1px] border-solid border-accent rounded-md">
            <div className="flex flex-row m-2">
              <Avatar>
                <AvatarImage src={message.author?.avatarUrl || ""} />
                <AvatarFallback>
                  {getInitials(
                    message.author.name + " " + message.author.lastName || ""
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justfiy-between ml-2">
                <div className="flex items-center justify-center gap-2">
                  <p className="text-sm font-semibold">
                    {message.author.name} {message.author.lastName}
                  </p>
                  <p className="text-muted-foreground text-xs font-medium">
                    {new Date(message.sentAt).toLocaleString("pl-PL", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-sm">
                  <MessageMarkdownParser content={message.content} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <DialogClose className="text-sm">Anuluj</DialogClose>
          <DialogClose asChild>
            <Button
              variant={"destructive"}
              onClick={async () => {
                await OMessage.deleteMessage(
                  message.channelId,
                  message.messageId
                );
              }}
            >
              Usuń
            </Button>
          </DialogClose>
        </div>
      </div>
    </DialogItem>
  );
}
