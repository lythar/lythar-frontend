"use client";
import { Icons } from "@/components/ui/icons";
import BaseSidebar from "../sidebar/app-navigation/navigation-sidebar";
import { useGlobalLoading } from "./global-loading-provider";
import HeadlineBranding from "@/components/branding/headline-branding";

const GlobalLoadingProviderRest = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { loading } = useGlobalLoading();

  if (loading) {
    return (
      <div className="container flex flex-col h-screen items-center">
        <HeadlineBranding />
        <div className="fixed h-screen translate-y-[50%] ">
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-0 h-screen relative overflow-hidden">
      <BaseSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default GlobalLoadingProviderRest;
