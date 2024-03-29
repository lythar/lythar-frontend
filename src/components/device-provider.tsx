"use client";
import { dynamicLogger } from "@/hooks/dynamic-logger";
import React, { createContext, useEffect, useState } from "react";

const DeviceContext = createContext({
  isMobile: false,
  isSidebarOpen: false,
  toggleSidebar: () => {},
  /**
   * @see This state is Desktop only.
   */
  userTabOpen: true,
  toggleUserTab: () => {},
  isPwa: false,
});

export const DeviceProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  /**
   * @see This state is Desktop only.
   */
  const [userTabOpen, setUserTabOpen] = useState(true);
  const [isPwa, setIsPwa] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleUserTab = () => setUserTabOpen((prev) => !prev);

  const value = {
    isMobile,
    isSidebarOpen,
    toggleSidebar,
    /**
     * @see This state is Desktop only.
     */
    userTabOpen,
    toggleUserTab,
    isPwa,
  };

  dynamicLogger().info("Rendering app. Using device context:", {
    isMobile: value.isMobile,
    isPwa: value.isPwa,
  });

  useEffect(() => {
    const fullLocation = window.location.href;
    const isPwa = fullLocation.includes("mode=standalone");
    setIsPwa(isPwa);

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDeviceContext = () => {
  const context = React.useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
