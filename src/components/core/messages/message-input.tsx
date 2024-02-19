import { Channel, StoreKeys, User } from "@/types/globals";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useStore } from "../wrappers/stores-provider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";
import _ from "lodash";
import { BiLogoBlender } from "react-icons/bi";
import AttachmentsDisplay from "./attachments/attachments-display";

interface MessageInputProps {
  currentChannel: Channel;
}

const MessageInput: FC<MessageInputProps> = ({ currentChannel }) => {
  const [messageContent, setMessageContent] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const accountStore = useStore(StoreKeys.AccountStore);
  const messageStore = useStore(StoreKeys.MessageStore);

  const addAttachment = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*, video/*, audio/*, application/*, text/*";
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;

      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 10485760) {
            alert("Plik jest za duży, maksymalny rozmiar to 10MB");
            files[i] = null as unknown as File;
          }
        }
      }

      if (files) {
        setAttachments((prev) => {
          if (prev) {
            return [...prev, ...Array.from(files).filter((f) => f)];
          }
          return Array.from(files).filter((f) => f);
        });
      }
    };
    input.click();
    input.remove();
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (messageContent.length === 0) return;

    const currentAccount = accountStore.getAll() as User;
    const sentAttachments = await Promise.all(
      _.map(attachments, async (file) => {
        const buffer = await file.arrayBuffer();
        return buffer;
      })
    );

    messageStore.sendMessage(messageContent, currentChannel, currentAccount);

    setMessageContent("");
  };

  return (
    <div className="py-2 px-2 relative shrink-0 -mt-[8px]">
      <form
        onSubmit={sendMessage}
        className="relative bg-popover-secondary rounded-md"
      >
        <AttachmentsDisplay
          attachments={attachments}
          setAttachments={setAttachments}
        />
        <div className="flex items-center">
          <button className="pl-3 flex items-center" onClick={addAttachment}>
            <IoAddCircle size={20} />
          </button>
          <Textarea
            ref={(el) => el?.focus()}
            rows={1.5}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
            value={messageContent}
            onChange={(e) => {
              if (e.target.value.length < 2000)
                setMessageContent(e.target.value);
            }}
            className="bg-transparent placeholder:text-foreground-variant ring-offset-transparent border-0 rounded-sm rounded-r-xl min-h-0 resize-none py-2 focus-visible:outline-none focus-visible:ring-transparent relative"
            placeholder={`Napisz na #${currentChannel.name}`}
          />
          <button className="pl-3 pr-4 flex items-center">
            <Send size={20} />
          </button>
        </div>

        {messageContent.length > 1500 ? (
          <span
            className={cn(
              "absolute -top-8 left-0 bg-sidebar px-2 rounded-lg border-2 border-solid border-input",
              messageContent.length > 1850
                ? " text-red-600"
                : "text-muted-foreground"
            )}
          >
            {2000 - messageContent.length}
          </span>
        ) : null}
      </form>
    </div>
  );
};

export default MessageInput;
