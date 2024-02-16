import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent , DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Message as TMessage } from "@/types/globals";
import { FC, useState } from "react";
import Markdown from "react-markdown";
import { BiDotsVerticalRounded } from "react-icons/bi";

const getInitials = (name: string) => {
  const nameArray = name.split(" ");
  return nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
};
interface MessageProps extends TMessage {
  previousMessage: TMessage | null;
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
          <DropdownMenuContent>
            <button className="block w-full text-left">Copy message</button>
            <button className="block w-full text-left">Delete message</button>
          </DropdownMenuContent>
        </DropdownMenu>
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
                  <AvatarImage src={""} />
                  <AvatarFallback>{getInitials(props.userId)}</AvatarFallback>
                </Avatar>
                <h3 className="min-h-[1.375rem] block relative leading-[1.375rem] whitespace-break-spaces">
                  <span className="mr-1">mufaro</span>
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
                <Markdown>{props.content}</Markdown>
              </span>
            </div>
          </div>
        </div>
      </li>
  );
};

function ContextMenuWrapper({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);


  // show a button on the right of the message when hovered over
  return (
    <div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "absolute right-0 top-0 z-10 w-8 h-8 p-0 m-0 bg-transparent border-0 cursor-pointer select-none",
            isHovered ? "visible" : "invisible"
          )}
        >
          <span className="sr-only">Open message options</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}

export default Message;
