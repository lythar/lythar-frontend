"use client";
import { useDeviceContext } from "@/components/device-provider";
import LoadingOverlay from "./loading-overlay";
import { dynamicLogger } from "@/hooks/dynamic-logger";
import BaseSidebar from "../sidebar/app-navigation/navigation-sidebar";

const GlobalLoadingProviderRest = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const deviceContext = useDeviceContext();

  dynamicLogger().info("Rendering app. Using device context:", {
    isMobile: deviceContext.isMobile,
    isPwa: deviceContext.isPwa,
  });

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-0 h-[100svh] relative overflow-hidden">
      <LoadingOverlay>
        <BaseSidebar />
        <div className="flex-1">{children}</div>
      </LoadingOverlay>
    </div>
  );
};

export default GlobalLoadingProviderRest;
