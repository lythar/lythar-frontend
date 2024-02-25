"use client";
import LoadingOverlay from "./loading-overlay";
import BaseSidebar from "../sidebar/app-navigation/navigation-sidebar";
import DrawFps from "@/components/draw-fps";
import { useSettings } from "./settings-provider";
import { useEffect, useState } from "react";

const GlobalLoadingProviderRest = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { settings } = useSettings();
  const [turnedOnFps, setTurnedOnFps] = useState(false);

  useEffect(() => {
    if (settings?.drawFps && !turnedOnFps) {
      setTurnedOnFps(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {turnedOnFps && <DrawFps />}
      <div className="flex flex-col-reverse md:flex-row min-h-0 h-[100svh] relative overflow-hidden">
        <LoadingOverlay>
          <BaseSidebar />
          <div className="flex-1">{children}</div>
        </LoadingOverlay>
      </div>
    </>
  );
};

export default GlobalLoadingProviderRest;
