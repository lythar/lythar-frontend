import { Channel as TChannel, User } from "@/types/globals";
import { FC, useState } from "react";
import { IoSend } from "react-icons/io5";
import AttachmentsDisplay from "./attachments/attachments-display";
import { FaPlus } from "react-icons/fa6";
import {
  Editor,
  EditorState,
  getDefaultKeyBinding,
  SelectionState,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { cn } from "@/lib/utils";
import Message from "@/stores/objects/Message";

interface MessageInputProps {
  currentChannel: TChannel;
  targetUser?: User;
}

const MAX_FILE_SIZE = 1024 * 1024 * 100;

const MessageInput: FC<MessageInputProps> = ({
  currentChannel,
  targetUser,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const messageContent = editorState.getCurrentContent().getPlainText();
  const [attachments, setAttachments] = useState<File[]>([]);

  const addAttachment = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*, video/*, audio/*, application/*, text/*";
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;

      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > MAX_FILE_SIZE) {
            alert("Plik jest za duży, maksymalny rozmiar to 100MB");
            files[i] = null as unknown as File;
          }
        }
      }

      if (files) {
        setAttachments((prev) => {
          if (prev) {
            return [...prev, ...Array.from(files).filter((f) => f)];
          }
          return Array.from(files).filter((f) => f);
        });
      }
    };
    input.click();
    input.remove();
  };

  const sendMessage = async () => {
    const messageContent = editorState.getCurrentContent().getPlainText();

    if (messageContent.length === 0) return;

    Message.sendMessage(currentChannel.channelId, messageContent, attachments);

    setAttachments([]);

    let contentState = editorState.getCurrentContent();
    const firstBlock = contentState.getFirstBlock();
    const lastBlock = contentState.getLastBlock();
    const allSelected = new SelectionState({
      anchorKey: firstBlock.getKey(),
      anchorOffset: 0,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
      hasFocus: true,
    });
    contentState = Modifier.removeRange(contentState, allSelected, "backward");
    let newEditorState = EditorState.push(
      editorState,
      contentState,
      "remove-range"
    );
    newEditorState = EditorState.forceSelection(
      newEditorState,
      contentState.getSelectionAfter()
    );
    setEditorState(newEditorState);
  };

  return (
    <div className="py-2 px-2 relative shrink-0 -mt-[8px]">
      <div className="relative bg-popover-secondary rounded-md">
        <AttachmentsDisplay
          attachments={attachments}
          setAttachments={setAttachments}
        />
        <div className="flex py-2 relative min-h-10 max-h-48">
          <div
            className="px-3 pt-[0.125rem] sticky h-fit self-stretch flex items-center text-muted-foreground cursor-pointer"
            onClick={addAttachment}
          >
            <FaPlus size={20} />
          </div>
          <Editor
            editorState={editorState}
            onChange={(e) => {
              setEditorState(e);
            }}
            handleKeyCommand={(command) => {
              if (command === "send-message") {
                sendMessage();
                return "handled";
              }

              return "not-handled";
            }}
            keyBindingFn={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                return "send-message";
              }
              return getDefaultKeyBinding(e);
            }}
            placeholder={
              targetUser
                ? `Napisz do ${targetUser?.name} ${targetUser?.lastName || ""}`
                : `Napisz wiadomość na #${currentChannel.name}`
            }
          />
          <button className="px-3 pt-[0.125rem] sticky h-fit self-stretch flex items-center text-muted-foreground cursor-pointer">
            <IoSend size={20} />
          </button>
        </div>

        {messageContent.length > 1500 ? (
          <span
            className={cn(
              "absolute -top-8 left-0 bg-sidebar px-2 rounded-lg border-2 border-solid border-input",
              messageContent.length > 1850
                ? " text-red-600"
                : "text-muted-foreground"
            )}
          >
            {2000 - messageContent.length}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default MessageInput;
