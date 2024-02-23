"use client";
import React, { createContext, useState } from "react";

const LoadingContext = createContext({
  loading: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoading: (loading: boolean) => {},
});

export const GlobalLoadingProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [loading, setLoading] = useState(true);
  const value = { loading, setLoading };
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "useGlobalLoading must be used within a GlobalLoadingProvider"
    );
  }
  return context;
};
