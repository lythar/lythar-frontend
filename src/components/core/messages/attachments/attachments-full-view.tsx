import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Attachment } from "@/types/globals";
import Image from "next/image";

interface AttachmentsFullViewProps {
  attachments: Attachment[];
  children: React.ReactNode;
}

export default function AttachmentsFullView({
  attachments,
  children,
}: AttachmentsFullViewProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="ATTACHMENTS_DISPLAY w-auto max-w-[90%] max-h-[90%] bg-transparent border-none">
        <Carousel className="w-full h-full">
          <CarouselContent className="w-auto h-auto flex items-center">
            {attachments.map((attachment) => (
              <CarouselItem
                key={`attachment-full-${attachment.fileId}`}
                className="w-full h-full flex justify-center overflow-hidden"
              >
                <Image
                  src={`http://${process.env.NEXT_PUBLIC_API_URL}${attachment.cdnUrl}`}
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="w-auto h-auto overflow-hidden select-none object-cover object-center"
                  alt="attachment"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
