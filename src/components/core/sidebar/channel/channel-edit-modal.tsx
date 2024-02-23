import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Channel } from "@/types/globals";
import { default as ChannelUtils } from "@/stores/objects/Channel";
import { useRouter } from "next/navigation";
import { useLastPosition } from "@/components/core/wrappers/last-position-provider";

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
  const { changeLastPosition } = useLastPosition();

  return (
    <Dialog>
      <DialogTrigger asChild>{shouldRender && children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-xl font-bold">
          #{channel.name}
        </DialogHeader>
        <DialogClose>
          <Button
            variant={"destructive"}
            onClick={async () => {
              if (isActive) {
                changeLastPosition("home", -1);
                router.push("/app/home");
              }
              await ChannelUtils.deleteChannel(channel.channelId);
            }}
          >
            Usuń
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
