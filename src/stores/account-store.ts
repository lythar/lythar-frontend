import { StoreKeys, User } from "@/types/globals";
import Store from "./base-store";
import client from "@/lib/api-client";

export default class AccountStore extends Store<User[keyof User], keyof User> {
  public override storeName = StoreKeys.AccountStore;

  public async initialFetch(): Promise<void> {
    const serverResponse = await client.GET("/account/api/account");

    if(serverResponse.error) {
      return Promise.reject("Error fetching account data");
    }

    for (const key in serverResponse.data) {
      if (Object.prototype.hasOwnProperty.call(serverResponse.data, key)) {
        const element = serverResponse.data[key as keyof User];
        if (element !== undefined)
          this.set(key as keyof User, element);
      }
    }
  }

  constructor() {
    super({ id: -1, name: "", lastName: "", email: "", avatarUrl: ""});
  }

}