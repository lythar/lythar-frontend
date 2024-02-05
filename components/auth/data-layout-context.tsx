"use client";

import { exampleUsers } from "@/example_data";
import { ExtractArray, PublicUser } from "@/lib/types";
import { createContext, useContext } from "react";

const DataLayoutContext = createContext({});

interface DataLayoutProviderProps {
  children: Readonly<React.ReactNode>;
  data: PublicUser;
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

export const useDataLayout = () => useContext(DataLayoutContext) as PublicUser;
