"use client";
import { StoreKeys, UserStatus, UserStatusBulk } from "@/types/globals";
import ArrayStore from "./base-store.array";
import { userPresenceEventTypes } from "@/components/core/websocket/events/user-presence-events";

export default class UserPresenceStore extends ArrayStore<UserStatusBulk> {
  public override storeName = StoreKeys.UserPresenceStore;

  constructor() {
    super([]);

    this.on(userPresenceEventTypes.UserStatusBulk, this.onUserBulkStatus);
    this.on(userPresenceEventTypes.UserStatus, this.onUserStatus);
  }

  private onUserBulkStatus(data: UserStatusBulk[]) {
    this.state = data;
    this.emit("change");
  }

  private onUserStatus(data: UserStatus) {
    if (data.status.isOnline === false) {
      this.state = this.state.filter((id) => id !== data.accountId);
    } else {
      if (!this.state.includes(data.accountId)) {
        this.state.push(data.accountId);
      }
    }
    this.emit("change");
  }

  public isUserOnline(id: number): boolean {
    return this.state.includes(id);
  }

  public splitOnlineOfflineUsers(ids: number[]): {
    online: number[];
    offline: number[];
  } {
    const online: number[] = [];
    const offline: number[] = [];
    ids.forEach((id) => {
      if (this.state.includes(id)) {
        online.push(id);
      } else {
        offline.push(id);
      }
    });
    return { online, offline };
  }

  public getOnlineUsers(): number[] {
    return this.state;
  }
}
