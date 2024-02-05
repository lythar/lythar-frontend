"use client";
import { ModeToggle } from "@/components/theme-mode-toggle";
import UserAuthForm from "@/components/auth/user-auth-form";
import HeadlineBranding from "@/components/branding/headline-branding";

export default function Home() {
  return (
    <>
      <div className="fixed bottom-0 m-4">
        <ModeToggle />
      </div>
      <main className="flex flex-col p-24">
        <HeadlineBranding />
        <UserAuthForm />
      </main>
    </>
  );
}
