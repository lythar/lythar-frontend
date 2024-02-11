"use client";
import React, { createContext, useEffect, useState } from "react";

const DeviceContext = createContext({
  isMobile: false,
});

export const DeviceProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isMobile, setIsMobile] = useState(false);

  const value = {
    isMobile,
  };

  useEffect(() => {
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
