import { AuthJwtPayload, verifyAuth } from "@/lib/auth";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exampleUsers } from "@/example_data";
import { DataLayoutProvider } from "@/components/auth/data-layout-context";
import { Metadata } from "next";
import BaseSidebar from "@/components/app/sidebar/app-navigation/navigation-sidebar";
import { StoreProvider } from "@/components/app/wrappers/stores-provider";
import { Stores } from "./stores";
import RccLayoutWrapper from "@/components/app/wrappers/rcc-layout-wrapper";
import { GlobalLoadingProvider } from "@/components/app/wrappers/global-loading-provider";
import GlobalLoadingProviderRest from "@/components/app/wrappers/global-loading-rest";
import { AnimatePresence } from "framer-motion";

async function fetchData() {
  "use server";

  // TODO - Implement API call to get user data once backend is ready.

  const token = cookies().get("auth-token")?.value || "";

  const verifiedToken = await verifyAuth(token);

  if (!verifiedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = decodeJwt(token) as AuthJwtPayload;
  const user = exampleUsers.find((user) => user.id === data.id);

  const filteredUser = { ...user, password: undefined };

  return { user: filteredUser };
}

export const metadata: Metadata = {
  title: "Lythar - Dashboard",
};

export default async function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  "use server";

  const data = await fetchData();

  if ("error" in data || "user" in data === false) {
    return NextResponse.redirect(new URL("/"), { status: 401 });
  }

  return (
    <RccLayoutWrapper>
      <GlobalLoadingProvider>
        <DataLayoutProvider data={data.user}>
          <StoreProvider stores={Stores}>
            <GlobalLoadingProviderRest>{children}</GlobalLoadingProviderRest>
          </StoreProvider>
        </DataLayoutProvider>
      </GlobalLoadingProvider>
    </RccLayoutWrapper>
  );
}
