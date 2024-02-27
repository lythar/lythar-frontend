import { Attachment } from "@/types/globals";
import Image from "next/image";
import AttachmentsFullViewMobile from "./attachments-full-view.mobile";
import { getApiUrl } from "@/lib/utils";

interface AttachmentsOnMessageProps {
  attachments: Attachment[];
}

export default function AttachmentsOnMessage({
  attachments,
}: AttachmentsOnMessageProps) {
  return (
    <AttachmentsFullViewMobile attachments={attachments}>
      {attachments.length > 0 && (
        <div className="space-y-2 mt-2">
          {attachments.map((attachment) => (
            <Image
              key={`attachment-${attachment.fileId}`}
              src={`${getApiUrl()}${attachment.cdnUrl}`}
              sizes="100vw"
              width={0}
              height={0}
              className="min-h-[100px] w-auto min-w-[100px] max-h-[800px] max-w-full lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[800px] aspect-video rounded-md overflow-hidden shadow-md cursor-pointer select-none object-cover object-center"
              alt="attachment"
            />
          ))}
        </div>
      )}
    </AttachmentsFullViewMobile>
  );
}
