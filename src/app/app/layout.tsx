"use client";

import { NextResponse } from "next/server";
import { DataLayoutProvider } from "@/components/auth/data-layout-context";
import { Metadata } from "next";
import { StoreProvider } from "@/components/app/wrappers/stores-provider";
import { Stores } from "./stores";
import RccLayoutWrapper from "@/components/app/wrappers/rcc-layout-wrapper";
import { GlobalLoadingProvider } from "@/components/app/wrappers/global-loading-provider";
import GlobalLoadingProviderRest from "@/components/app/wrappers/global-loading-rest";
import client from "@/lib/api-client";
import { User } from "@/types/globals";
import { Suspense, useEffect, useState } from "react";

// async function fetchData() {
//   "use server";

//   // TODO - Implement API call to get user data once backend is ready.

//   // const data = decodeJwt(token) as AuthJwtPayload;
//   // const user = exampleUsers.find((user) => user.id === data.id);

//   const user = await client().GET("/account/api/account", {
//     credentials: "include",
//   });

//   if (user.error) {
//     return { error: "User not found" };
//   }

//   return { user: user.data } as { user: User };
// }

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      const user = await client.GET("/account/api/account", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (user.error) {
        return NextResponse.redirect(new URL("/", window.location.href));
      }

      setUser(user.data as User);
    }

    fetchData();
  }, []);

  return <LayoutWrapper user={user as User}>{children}</LayoutWrapper>;
}

function LayoutWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return (
    <Suspense fallback="LOADING">
      <RccLayoutWrapper>
        <GlobalLoadingProvider>
          <DataLayoutProvider data={user}>
            <StoreProvider stores={Stores}>
              <GlobalLoadingProviderRest>{children}</GlobalLoadingProviderRest>
            </StoreProvider>
          </DataLayoutProvider>
        </GlobalLoadingProvider>
      </RccLayoutWrapper>
    </Suspense>
  );
}
