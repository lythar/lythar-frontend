"use client";

import { useEffect, useState } from "react";
import { useGlobalLoading } from "./global-loading-provider";
import HeadlineBranding from "@/components/branding/headline-branding";
import { Icons } from "@/components/ui/icons";
import { dynamicLogger } from "@/hooks/dynamic-logger";

interface LoadingOverlayProps {
  children: React.ReactNode;
}

export default function LoadingOverlay({ children }: LoadingOverlayProps) {
  const { loading } = useGlobalLoading();
  const [overlayProperties, setOverlayProperties] = useState({
    show: true,
    loadingDebounce: true,
    shouldRenderContent: false,
  });

  useEffect(() => {
    if (!loading) {
      setOverlayProperties((p) => ({ ...p, shouldRenderContent: true }));

      const debounce = setTimeout(() => {
        setOverlayProperties((p) => ({ ...p, loadingDebounce: false }));
      }, 500);
      const timer = setTimeout(() => {
        setOverlayProperties((p) => ({ ...p, show: false }));
      }, 1000);

      dynamicLogger().info("LoadingOverlay has been hidden.");

      return () => {
        clearTimeout(debounce);
        clearTimeout(timer);
      };
    } else {
      setOverlayProperties((p) => ({
        ...p,
        show: true,
        shouldRenderContent: false,
      }));
    }
  }, [loading]);

  return (
    <>
      {overlayProperties.shouldRenderContent && <>{children}</>}

      {overlayProperties.show && (
        <div
          className={`fixed w-screen h-screen
           bg-background z-[999] flex flex-col items-center transition-opacity duration-300 ease-in-out ${
             overlayProperties.loadingDebounce ? "opacity-100" : "opacity-0"
           } `}
        >
          <HeadlineBranding />
          <div className="fixed h-screen translate-y-[50%] ">
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          </div>
        </div>
      )}
    </>
  );
}
