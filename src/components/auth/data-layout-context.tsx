"use client";

import { User } from "../../types/globals";
import { createContext, useContext } from "react";

const DataLayoutContext = createContext({});

interface DataLayoutProviderProps {
  children: Readonly<React.ReactNode>;
  data: User;
}

export const DataLayoutProvider = ({
  children,
  data,
}: DataLayoutProviderProps) => {
  return (
    <DataLayoutContext.Provider value={data}>
      {children}
    </DataLayoutContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDataLayout = () => useContext(DataLayoutContext) as User;
