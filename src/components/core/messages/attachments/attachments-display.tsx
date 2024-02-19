import Image from "next/image";
import { FaTrash } from "react-icons/fa6";

interface AttachmentsDisplayProps {
  attachments: File[];
  setAttachments: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function AttachmentsDisplay({
  attachments,
  setAttachments,
}: AttachmentsDisplayProps) {
  return (
    attachments.length > 0 && (
      <div className="flex flex-row gap-4 px-2 py-4 w-full h-fit overflow-x-scroll">
        {attachments.map((file, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-2 w-40 h-full items-center px-2 py-1 text-foreground-variant rounded-md relative"
            >
              <Image
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={512}
                height={512}
                className="w-full h-full rounded-md"
              />
              <span className="text-xs align-end mx-4 font-semibold">
                {file.name.length
                  ? file.name.length > 20
                    ? file.name.slice(0, 20) + "..."
                    : file.name
                  : "Plik"}
              </span>
              <button
                className="p-2 rounded-lg bg-sidebar flex items-center absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 text-muted-foreground"
                onClick={() => {
                  setAttachments((prev) => {
                    if (prev) {
                      prev.splice(index, 1);
                      return [...prev];
                    }
                    return [];
                  });
                }}
              >
                <FaTrash size={14} />
              </button>
            </div>
          );
        })}
      </div>
    )
  );
}
