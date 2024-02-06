import { AuthJwtPayload, verifyAuth } from "@/lib/auth";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exampleUsers } from "@/example_data";
import { DataLayoutProvider } from "@/components/auth/data-layout-context";
import { Metadata } from "next";
import BaseSidebar from "@/components/app/sidebar/sidebar";

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

  if ("error" in data) {
    return NextResponse.redirect(new URL("/"), { status: 401 });
  }

  return (
    <DataLayoutProvider data={data.user}>
      <div className="flex min-h-0 h-screen relative overflow-hidden">
        <BaseSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </DataLayoutProvider>
  );
}
