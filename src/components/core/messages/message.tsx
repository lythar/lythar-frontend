import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Message as TMessage, User } from "@/types/globals";
import { FC, useState } from "react";
import Markdown from "react-markdown";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Copy, Trash } from "lucide-react";
import MessageMarkdownParser from "./message-markdown-parser";

const getInitials = (name: string) => {
  const nameArray = name.split(" ");
  return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
};
interface MessageProps extends TMessage {
  previousMessage: TMessage | null;
  user: User;
}

const Message: FC<MessageProps> = (props) => {
  const useStacked = props.previousMessage?.userId === props.userId;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative list-item", isHovered ? "bg-popover" : null)}
    >
      <MessageContextMenu setIsHovered={setIsHovered} isHovered={isHovered} />
      <div
        className={cn(
          "relative pl-[calc(40px+16px+16px)] py-[0.15rem] pr-[48px] select-text break-words ",
          useStacked ? null : "mt-4 min-h-11"
        )}
      >
        <div className="static ml-0 pl-0 indent-0">
          {useStacked ? (
            <span
              className={cn(
                "absolute left-0  w-[56px] select-none text-right z-10 text-[.6875rem] leading-[1.375rem] indent-0 mr-1 text-muted-foreground inline-block cursor-default  align-baseline pointer-events-none font-medium",
                isHovered ? "inline-block" : "hidden"
              )}
            >
              <time>
                {new Date(props.createdAt).toLocaleTimeString("pl-PL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </span>
          ) : (
            <>
              <Avatar className="absolute left-[16px] mt-[calc(4px-0.125rem)] w-[40px] h-[40px] z-10 overflow-hidden cursor-pointer select-none  ">
                <AvatarImage src={props.user.avatarUrl || ""} />
                <AvatarFallback>
                  {getInitials(`${props.user.name} ${props.user.lastName}`)}
                </AvatarFallback>
              </Avatar>
              <h3 className="min-h-[1.375rem] block relative leading-[1.375rem] whitespace-break-spaces">
                <span className="mr-1">{`${props.user.name} ${props.user.lastName}`}</span>
                <span className="text-xs leading-[1.375rem] h-[1.25rem] font-medium inline-block ml-1 align-baseline text-muted-foreground">
                  <time>
                    {new Date(props.createdAt).toLocaleTimeString("pl-PL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </span>
              </h3>
            </>
          )}

          <div className="-ml-[calc(40px+16px+16px)] pl-[calc(40px+16px+16px)] overflow-hidden relative indent-0 whitespace-break-spaces">
            <span>
              {/* <Markdown
                allowedElements={[
                  "p",
                  "a",
                  "strong",
                  "em",
                  "code",
                  "pre",
                  "blockquote",
                ]}
                unwrapDisallowed
              >
                {props.content}
              </Markdown> */}
              <MessageMarkdownParser content={props.content} />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

function MessageContextMenu({
  setIsHovered,
  isHovered,
}: {
  setIsHovered: (hovered: boolean) => void;
  isHovered: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            `absolute right-0
          -translate-x-1/2
        -top-2 z-[5] w-8 h-8 bg-sidebar border-[1px] border-solid cursor-pointer select-none flex items-center rounded-lg`,
            isHovered ? "visible" : "invisible"
          )}
        >
          <BiDotsVerticalRounded size={20} className="w-8" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <div className="flex items-center gap-2">
          <button className="block w-full text-left">Kopiuj tekst</button>
          <Copy size={20} />
        </div>
        <div className="flex items-center gap-2 text-red-500">
          <button className="block w-full text-left">Usuń wiadomość</button>
          <Trash size={20} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Message;
