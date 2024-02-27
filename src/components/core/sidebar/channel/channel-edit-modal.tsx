import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Channel } from "@/types/globals";
import { default as ChannelUtils } from "@/stores/objects/Channel";
import { useRouter } from "next/navigation";
import { useLastPosition } from "@/components/core/wrappers/last-position-provider";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getApiUrl } from "@/lib/utils";

interface ChannelEditModalProps {
  children: React.ReactNode;
  channel: Channel;
  shouldRender: boolean;
  isActive: boolean;
}

export default function ChannelEditModal({
  children,
  channel,
  shouldRender,
  isActive,
}: ChannelEditModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const { changeLastPosition } = useLastPosition();
  const [newIcon, setNewIcon] = useState<File | null>(null);

  const handleIconChangeButton = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = false;
    input.accept = "image/png, image/jpeg, image/jpg, image/webp";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setNewIcon(file);
      }
    };

    input.click();
    input.remove();
  };

  const uploadIcon = async () => {
    if (newIcon) {
      const iconBuffer = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
        reader.readAsArrayBuffer(newIcon);
      });

      const ext = newIcon.name.split(".").at(-1)!;

      await ChannelUtils.updateIcon(channel.channelId, iconBuffer, ext).catch(
        console.error
      );
      // if (typeof res == "object") accountStore.setAvatar(res.avatarUrl!);
      setNewIcon(null);
    }
  };

  const getPreview = () => {
    if (newIcon) {
      return URL.createObjectURL(newIcon);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{shouldRender && children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-xl font-bold">
          {channel.name}
        </DialogHeader>
        <div>
          <Avatar className="h-24 w-24 md:h-20 md:w-20">
            <AvatarImage
              src={newIcon ? getPreview() : `${getApiUrl()}${channel.iconUrl}`}
              alt="avatar"
            />
            <AvatarFallback>{channel.iconUrl}</AvatarFallback>
          </Avatar>
          <Button onClick={handleIconChangeButton} className="w-full md:w-fit">
            <span>Zmień zdjęcie</span>
          </Button>
          {newIcon && (
            <div className="absolute z-20 bottom-20 md:bottom-4 left-0 right-0 mx-auto p-3 md:p-4 flex justify-between items-center bg-popover-secondary w-[95%] md:w-[40rem] rounded-xl border-2 border-solid border-primary">
              <p className="text-xs md:text-normal">
                Masz nie zapisane zmiany!
              </p>
              <div className="flex gap-2 items-center">
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setNewIcon(null);
                  }}
                  className="h-8 md:h-10 text-xs md:text-normal"
                >
                  <span>Anuluj</span>
                </Button>
                <Button
                  variant="outline"
                  className=" bg-green-600 h-8 md:h-10 text-xs md:text-normal"
                  onClick={async () => {
                    uploadIcon();
                  }}
                >
                  <span className="text-primary-foreground ">
                    Zapisz zmiany
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
        <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>Usuń</Button>
          </DialogTrigger>
          <DialogContent>
            <div>
              Czy z pewnością chcesz usunąć grupę{" "}
              <span className="font-bold text-accent">{channel.name}</span>?
            </div>
            <div className="flex gap-4">
              <Button
                variant={"default"}
                className="flex-1"
                onClick={() => {
                  setConfirmationOpen(false);
                }}
              >
                Anuluj
              </Button>
              <Button
                variant={"destructive"}
                className="flex-1"
                onClick={async () => {
                  if (isActive) {
                    changeLastPosition("home", -1);
                    router.push("/app/home");
                    setConfirmationOpen(false);
                    setOpen(false);
                  }
                  await ChannelUtils.deleteChannel(channel.channelId);
                }}
              >
                Usuń
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}
