import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "../../wrappers/stores-provider";
import { Channel, StoreKeys } from "@/types/globals";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { default as ChannelUtils } from "@/stores/objects/Channel";

export default function ChannelPrivateRemoveMember({
  children,
  currentChannel,
}: {
  children: React.ReactNode;
  currentChannel: Channel;
}) {
  const [open, setOpen] = useState(false);
  const userStore = useStore(StoreKeys.UserStore);
  const usersInChannel = Object.entries(userStore.getAll()).filter(([id]) =>
    currentChannel.members.includes(parseInt(id))
  );

  const [userSearch, setUserSearch] = useState<string>("");

  const addMember = async (userId: number) => {
    await ChannelUtils.removeFromChannel(currentChannel.channelId, userId);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <p>Użytkownicy, których możesz usunąć z grupy:</p>
        <Input
          type="text"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <ul>
          {usersInChannel
            .filter(
              ([, user]) =>
                user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                user.lastName?.toLowerCase().includes(userSearch.toLowerCase())
            )
            .map(([id, user], i) =>
              i > 10 ? null : (
                <li key={id} className="flex justify-between">
                  <div>
                    {user.name} {user.lastName || ""}
                  </div>
                  <button
                    onClick={() => {
                      addMember(parseInt(id));
                    }}
                  >
                    Dodaj
                  </button>
                </li>
              )
            )}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
