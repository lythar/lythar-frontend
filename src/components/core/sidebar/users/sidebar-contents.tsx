"use client";

import { Channel, StoreKeys } from "@/types/globals";
import { useStore } from "../../wrappers/stores-provider";
import UserDisplay from "./user-display";
import { useMemo, useState } from "react";

interface UserSidebarContentsProps {
  currentChannel: Channel;
}

export default function UsersSidebarContents({
  currentChannel,
}: UserSidebarContentsProps) {
  const userStore = useStore(StoreKeys.UserStore);
  const [usersOnThisChannel, setUsersOnThisChannel] = useState<number[]>([]);
  useMemo(() => {
    let _usersOnThisChannel = Object.keys(userStore.getAll()).map(Number);
    if (!currentChannel.isPublic)
      _usersOnThisChannel = _usersOnThisChannel.filter((id) =>
        currentChannel.members.includes(Number(id))
      );

    setUsersOnThisChannel(_usersOnThisChannel);
  }, [currentChannel, userStore]);

  const presenseStore = useStore(StoreKeys.UserPresenceStore);

  const { offline, online } =
    presenseStore.splitOnlineOfflineUsers(usersOnThisChannel);

  return (
    <div className="px-4 h-full md:h-auto">
      <ul className="space-y-4 h-full overflow-y-scroll overflow-x-hidden">
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
