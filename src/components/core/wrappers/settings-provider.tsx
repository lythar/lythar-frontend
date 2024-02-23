"use client";
import React, { createContext } from "react";
import { default as useSettingsHook } from "@/hooks/useSettings";
import { Settings } from "@/types/globals";

const SettingsContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  settings: {} as Settings,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSettings: (settings: Settings) => {},
});

export const SettingsProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { settings, setSettings } = useSettingsHook();

  const value = { settings, setSettings };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
