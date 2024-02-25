import { StoreKeys, User } from "@/types/globals";
import Store from "./base-store";
import client from "@/lib/api-client";

export default class UserStore extends Store<User, number> {
  public override storeName = StoreKeys.UserStore;

  public async initialFetch(): Promise<void> {
    const accountIds = await client.GET("/account/api/accounts/list");

    if (accountIds.error) {
      return Promise.reject("Error fetching account ids");
    }

    const serverResponse = await client.GET("/account/api/accounts", {
      params: {
        query: {
          accountIds: accountIds.data,
        },
      },
    });

    if (serverResponse.error) {
      return Promise.reject("Error fetching account data");
    }

    for (const account of serverResponse.data) {
      this.set(account.id!, account as User);
    }

    this.emit("change");
  }

  public getUserById(id: number): User {
    return this.get(id);
  }

  constructor() {
    super([]);
  }
}
