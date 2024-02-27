"use client";

import { NextResponse } from "next/server";
import { DataLayoutProvider } from "@/components/auth/data-layout-context";
import { StoreProvider } from "@/components/core/wrappers/stores-provider";
import { Stores } from "./stores";
import RccLayoutWrapper from "@/components/core/wrappers/rcc-layout-wrapper";
import { GlobalLoadingProvider } from "@/components/core/wrappers/global-loading-provider";
import GlobalLoadingProviderRest from "@/components/core/wrappers/global-loading-rest";
import client from "@/lib/api-client";
import { User } from "@/types/globals";
import { Suspense, useEffect, useState } from "react";
import LoadingOverlayFallback from "@/components/core/wrappers/loading-overlay-fallback";
import { LastPositionProvider } from "@/components/core/wrappers/last-position-provider";
import WebSocketProvider from "@/components/core/wrappers/websocket-provider";
import { getWsUrl } from "@/lib/utils";

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
  const isProd = process.env.NODE_ENV === "production";

  return (
    <Suspense fallback={<LoadingOverlayFallback />}>
      <RccLayoutWrapper>
        <GlobalLoadingProvider>
          <LastPositionProvider>
            <DataLayoutProvider data={user}>
              <StoreProvider stores={Stores}>
                <WebSocketProvider
                  url={(isProd ? `${getWsUrl()}/ws` : getWsUrl()) || ""}
                >
                  <GlobalLoadingProviderRest>
                    {children}
                  </GlobalLoadingProviderRest>
                </WebSocketProvider>
              </StoreProvider>
            </DataLayoutProvider>
          </LastPositionProvider>
        </GlobalLoadingProvider>
      </RccLayoutWrapper>
    </Suspense>
  );
}
