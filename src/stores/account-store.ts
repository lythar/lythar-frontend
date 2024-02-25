import { StoreKeys, Account } from "@/types/globals";
import Store from "./base-store";
import client from "@/lib/api-client";

export default class AccountStore extends Store<
  Account[keyof Account],
  keyof Account
> {
  public override storeName = StoreKeys.AccountStore;

  public async initialFetch(): Promise<void> {
    const serverResponse = await client.GET("/account/api/account");

    if (serverResponse.error) {
      return Promise.reject("Error fetching account data");
    }

    for (const key in serverResponse.data) {
      if (Object.prototype.hasOwnProperty.call(serverResponse.data, key)) {
        const element = serverResponse.data[key as keyof Account];
        if (element !== undefined) this.set(key as keyof Account, element);
      }
    }

    this.emit("change");
  }

  public async setAvatar(url: string): Promise<void> {
    this.set("avatarUrl", url);
    await new Promise((resolve) => setTimeout(resolve, 250));
    this.emit("change");
  }

  constructor() {
    super();
  }
}
