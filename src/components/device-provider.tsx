"use client";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

const DeviceContext = createContext({
  isMobile: false,
  isSidebarOpen: false,
  toggleSidebar: () => {},
  isPwa: false,
});

export const DeviceProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPwa, setIsPwa] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const value = {
    isMobile,
    isSidebarOpen,
    toggleSidebar,
    isPwa,
  };

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

export const useDeviceContext = () => {
  const context = React.useContext(DeviceContext);
  if (!context) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
