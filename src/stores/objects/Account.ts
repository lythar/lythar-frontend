import { getApiUrl } from "@/lib/utils";

export default class Account {
  static async updateAvatar(fileBuf: string, ext: string) {
    const response = await fetch(`${getApiUrl()}/account/api/account/avatar`, {
      method: "POST",
      headers: {
        "Content-Type": `image/${ext}`,
        Authorization: localStorage.getItem("token") || "",
      },
      body: fileBuf,
    });

    const data = await response.json();
    const error =
      response.status !== 200
        ? { errorMessage: "Error updating avatar" }
        : undefined;

    if (error) {
      throw new Error((error as { errorMessage: string }).errorMessage);
    }

    return data;
  }
}
