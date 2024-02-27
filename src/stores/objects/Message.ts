import client from "@/lib/api-client";
import { getApiUrl } from "@/lib/utils";
import _ from "lodash-es";

export default class Message {
  static async sendMessage(channelId: number, message: string, files: File[]) {
    const mappedFiles = await Promise.all(
      _.map(files, async (file) => {
        const bytes = await fileToBytes(file);
        const fileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");

        const response = await fetch(
          `${getApiUrl()}/attachments/api/upload/${fileName}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/octet-stream",
              Authorization: localStorage.getItem("token") || "",
            },
            body: bytes,
          }
        );

        const data = await response.json();

        const error =
          response.status !== 200
            ? { errorMessage: "Error uploading attachment" }
            : undefined;

        if (error) {
          throw new Error((error as { errorMessage: string }).errorMessage);
        }

        return data as { fileId: string; name: string; cdnUrl: string };
      })
    );

    const serverResponse = await client.POST(
      "/channels/api/{channelId}/messages",
      {
        params: {
          path: {
            channelId: channelId,
          },
        },
        body: {
          content: message,
          attachmentIds: mappedFiles.map((f) => f.fileId),
        },
      }
    );

    if (serverResponse.response.status !== 200) {
      console.error("Error sending message", serverResponse);
    }
  }

  static async deleteMessage(channelId: number, messageId: number) {
    const serverResponse = await client.DELETE(
      "/channels/api/{channelId}/messages/{messageId}",
      {
        params: {
          path: {
            channelId,
            messageId,
          },
        },
      }
    );

    if (serverResponse.response.status !== 200) {
      console.error("Error deleting message", serverResponse);
    }
  }

  static async editMessage(
    channelId: number,
    messageId: number,
    newContent: string
  ) {
    const serverResponse = await client.PATCH(
      "/channels/api/{channelId}/messages/{messageId}",
      {
        params: {
          path: {
            channelId,
            messageId,
          },
        },
        body: { content: newContent },
      }
    );

    if (serverResponse.response.status !== 200) {
      console.error("Error editing message", serverResponse);
    }
  }
}

async function fileToBytes(file: File) {
  return await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.readAsArrayBuffer(file);
  });
}
