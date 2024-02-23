import { Dialog, DialogContent, DialogPortal, DialogTrigger } from "./dialog";
import { DropdownMenuItem } from "./dropdown-menu";
/**
 * Temporary fix for dialogues and dropdowns
 * @see https://github.com/radix-ui/primitives/issues/1836#issuecomment-1850627545
 */

type Props = {
  triggerChildren: React.ReactNode;
  children: React.ReactNode;
  onSelect: () => void;
  onOpenChange: (open: boolean) => void;
};

const DialogItem = ({
  triggerChildren,
  children,
  onSelect,
  onOpenChange,
}: Props) => {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="bg-transparent focus:bg-transparent p-0"
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>{children}</DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

DialogItem.displayName = "DialogItem";

export default DialogItem;
