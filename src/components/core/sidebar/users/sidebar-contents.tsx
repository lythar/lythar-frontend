"use client";

import { StoreKeys } from "@/types/globals";
import { useStore } from "../../wrappers/stores-provider";
import UserDisplay from "./user-display";

export default function UsersSidebarContents() {
  const userStore = useStore(StoreKeys.UserStore);
  const presenseStore = useStore(StoreKeys.UserPresenceStore);

  const { offline, online } = presenseStore.splitOnlineOfflineUsers(
    Object.keys(userStore.getAll()).map(Number)
  );

  return (
    <div className="px-4">
      <ul className="space-y-4 overflow-y-scroll overflow-x-hidden">
        <div className="space-y-2">
          <span className="font-medium text-foreground-variant uppercase text-xs">
            Online ({online.length})
          </span>
          <div className="space-y-2">
            {online
              .sort((a, b) => {
                const userA = userStore.get(a);
                const userB = userStore.get(b);
                return userA.name.localeCompare(userB.name, "pl");
              })
              .map((id) => (
                <li key={id}>
                  <UserDisplay user={userStore.get(id)} isOnline />
                </li>
              ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-medium text-foreground-variant uppercase text-xs">
            Offline ({offline.length})
          </span>
          <div className="space-y-2">
            {offline.map((id) => (
              <li key={id}>
                <UserDisplay user={userStore.get(id)} isOnline={false} />
              </li>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
}
