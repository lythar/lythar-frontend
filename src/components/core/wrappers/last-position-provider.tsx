"use client";
import { dynamicLogger } from "@/hooks/dynamic-logger";
import React, { createContext, useState } from "react";

type LastPosition = {
  home: number;
  conversation: number;
};

const LastPositionContext = createContext({
  home: -1,
  conversation: -1,
  changeLastPosition: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    key: keyof LastPosition,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value: LastPosition[keyof LastPosition]
  ) => {},
});

export const LastPositionProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [lastPosData, setLastPosData] = useState({
    home: -1,
    conversation: -1,
  });

  const changeLastPosition = (
    key: keyof typeof lastPosData,
    value: LastPosition[keyof typeof lastPosData]
  ) => {
    dynamicLogger().log(`Last position changed: ${key} - ${value}`);
    setLastPosData((prev) => ({ ...prev, [key]: value }));
  };

  const value = { ...lastPosData, changeLastPosition };

  return (
    <LastPositionContext.Provider value={value}>
      {children}
    </LastPositionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLastPosition = () => {
  const context = React.useContext(LastPositionContext);
  if (!context) {
    throw new Error(
      "useLastPosition must be used within a LastPositionProvider"
    );
  }
  return context;
};
