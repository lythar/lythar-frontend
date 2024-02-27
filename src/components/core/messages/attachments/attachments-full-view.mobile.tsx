import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getApiUrl } from "@/lib/utils";
import { Attachment } from "@/types/globals";
import Image from "next/image";

interface AttachmentsFullViewProps {
  attachments: Attachment[];
  children: React.ReactNode;
}

export default function AttachmentsFullViewMobile({
  attachments,
  children,
}: AttachmentsFullViewProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="ATTACHMENTS_DISPLAY max-w-full h-[80%] max-h-full border-none flex items-center">
        <Carousel className="w-full h-full flex items-center ATTACHMENT_DISPLAY_CAROUSEL">
          <CarouselContent className="w-full h-full flex items-center">
            {attachments.map((attachment) => (
              <CarouselItem
                key={`attachment-full-${attachment.fileId}`}
                className="w-full h-full flex justify-center overflow-hidden"
              >
                <Image
                  src={`${getApiUrl()}${attachment.cdnUrl}`}
                  sizes="100vw"
                  width={0}
                  height={0}
                  className="w-auto h-auto overflow-hidden select-none object-contain object-center"
                  alt="attachment"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
