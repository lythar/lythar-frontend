import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Message as TMessage, User } from "@/types/globals";
import { FC, useEffect, useState } from "react";
import MessageMarkdownParser from "./message-markdown-parser";
import MessageContextMenu from "./message-context-menu";
import { EditingData } from "./message-view";
import { Input } from "@/components/ui/input";
import { default as OMessage } from "@/stores/objects/Message";
import Twemoji from "react-twemoji";

export const getInitials = (name: string) => {
  const nameArray = name.split(" ");
  return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
};
interface MessageProps extends TMessage {
  shouldStack: boolean;
  ref?: any;
  editingData: EditingData;
  setEditingData: React.Dispatch<React.SetStateAction<EditingData>>;
}

function parseDate(date: string) {
  const today = new Date();
  const sentDate = new Date(date);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (sentDate.toDateString() === today.toDateString()) {
    return `Dzisiaj o ${sentDate.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else if (sentDate.toDateString() === yesterday.toDateString()) {
    return `Wczoraj o ${sentDate.toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return sentDate.toLocaleDateString("pl-PL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

const Message: FC<MessageProps> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const isEditingThisMessage = props.editingData?.messageId === props.messageId;
  const [editingContent, setEditingContent] = useState(props.content);

  return (
    <li
      ref={props.ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative list-item",
        isHovered || contextMenuOpen || isEditingThisMessage
          ? "bg-background-secondary"
          : null
      )}
    >
      {isEditingThisMessage ? null : (
        <MessageContextMenu
          editingData={props.editingData}
          setIsEditingData={props.setEditingData}
          message={props}
          setIsHovered={setIsHovered}
          isHovered={isHovered}
          contextMenuOpen={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
        />
      )}

      <div
        className={cn(
          "relative pl-[calc(40px+16px+16px)] py-[0.15rem] pr-[48px] select-text break-words ",
          props.shouldStack ? null : "mt-4 min-h-11"
        )}
      >
        <div className="static ml-0 pl-0 indent-0">
          {props.shouldStack ? (
            <span
              className={cn(
                "absolute left-0  w-[56px] select-none text-right z-10 text-[.6875rem] leading-[1.375rem] indent-0 mr-1 text-muted-foreground inline-block cursor-default  align-baseline pointer-events-none font-medium",
                isHovered || contextMenuOpen ? "inline-block" : "hidden"
              )}
            >
              <time>
                {new Date(props.sentAt).toLocaleTimeString("pl-PL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </span>
          ) : (
            <>
              <Avatar className="absolute left-[16px] mt-[calc(4px-0.125rem)] w-[40px] h-[40px] z-10 overflow-hidden cursor-pointer select-none  ">
                <AvatarImage src={props.author.avatarUrl || ""} />
                <AvatarFallback>
                  {getInitials(`${props.author.name} ${props.author.lastName}`)}
                </AvatarFallback>
              </Avatar>
              <h3 className="min-h-[1.375rem] block relative leading-[1.375rem] font-semibold whitespace-break-spaces">
                <span className="mr-1">{`${props.author.name} ${props.author.lastName}`}</span>
                <span className="text-xs leading-[1.375rem] h-[1.25rem] font-medium inline-block ml-1 align-baseline text-muted-foreground">
                  <time>{parseDate(props.sentAt)}</time>
                </span>
              </h3>
            </>
          )}

          <div className="-ml-[calc(40px+16px+16px)] pl-[calc(40px+16px+16px)] overflow-hidden relative indent-0 whitespace-break-spaces">
            {isEditingThisMessage ? (
              <>
                <Input
                  value={editingContent}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (
                        editingContent !== props.content &&
                        editingContent !== ""
                      ) {
                        OMessage.editMessage(
                          props.channelId,
                          props.messageId,
                          editingContent
                        );
                      } else {
                        props.setEditingData({
                          messageId: null,
                          content: "",
                        });
                      }
                    } else if (e.key === "Escape") {
                      props.setEditingData({ messageId: null, content: "" });
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value.length < 2000)
                      setEditingContent(e.target.value);
                  }}
                  className="mt-2  bg-popover-secondary placeholder:text-foreground-variant ring-offset-transparent border-2 border-accent rounded-sm min-h-0 resize-none py-2 focus-visible:outline-none focus-visible:ring-transparent relative"
                  placeholder={`Edytuj`}
                />
                <span className="text-xs text-muted-foreground">
                  escape - <span className="text-accent">anuluj</span>, enter -{" "}
                  <span className="text-accent">zapisz</span>
                </span>
                <div className="h-2"></div>
              </>
            ) : (
              <span className="flex items-center gap-2">
                <MessageMarkdownParser content={props.content} />
                {props.editedAt && (
                  <span className="text-xs text-muted-foreground select-none">
                    (edytowano)
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Message;
