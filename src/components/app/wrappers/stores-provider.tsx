"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { StoreKeys, StoreKeysWithoutNone, StoreType } from "@/lib/types";
import { Stores } from "@/app/app/stores";
import { useGlobalLoading } from "./global-loading-provider";
import { Logger } from "@/lib/logger";

export const mapStores = (stores: typeof Stores) => {
  const obj: StoreType = {} as StoreType;
  stores.forEach((store) => {
    if (store.storeName === StoreKeys.None) return;
    obj[store.storeName] = store;
  });

  return obj;
};

const StoreContext = createContext<StoreType | null>(null);

interface StoreProviderProps {
  children: Readonly<React.ReactNode>;
  stores: typeof Stores;
}

export const StoreProvider = ({ children, stores }: StoreProviderProps) => {
  const [storesState, setStoresState] = useState<StoreType | null>(null);
  const { setLoading } = useGlobalLoading();
  const logger = new Logger("StoreProvider");

  useEffect(() => {
    const mappedStores = mapStores(stores);
    setStoresState(mappedStores);
    logger.info(`Stores loaded [${stores.length}]`);
    setLoading(false);
  }, [stores]);

  return (
    <StoreContext.Provider value={storesState}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (store: StoreKeysWithoutNone) => {
  const targetStore = useContext(StoreContext)?.[store];
  return targetStore as StoreType[typeof store];
};
