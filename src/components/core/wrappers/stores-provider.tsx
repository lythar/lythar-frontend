"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CombinedStore,
  StoreKeys,
  StoreKeysWithoutNone,
  StoreType,
} from "../../../types/globals";
import { Stores } from "@/app/app/stores";
import { useGlobalLoading } from "./global-loading-provider";
import { Logger } from "@/lib/logger";

export const mapStores = async (stores: Awaited<typeof Stores>) => {
  const obj: StoreType = {} as StoreType;
  stores.forEach(async (store) => {
    if (store.storeName === StoreKeys.None) return;
    obj[store.storeName] = store as CombinedStore;
    await store.initialFetch();
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
  const logger = useCallback(() => new Logger("StoreProvider"), []);

  useEffect(() => {
    const asyncLoad = async () => {
      await stores;
      const mappedStores = await mapStores(await stores);
      setStoresState(mappedStores);

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      setLoading(false);

      logger().info(`Stores loaded [${(await stores).length}]`);
    };

    asyncLoad();
  }, [stores, logger, setLoading]);

  return (
    <StoreContext.Provider value={storesState}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = <T extends StoreKeysWithoutNone>(store: T) => {
  const [_, forceUpdate] = useState(0);
  const targetStore = useContext(StoreContext)?.[store];

  useEffect(() => {
    const handleChange = () => {
      forceUpdate((c) => c + 1);
    };
    targetStore?.on("change", handleChange);
    return () => {
      targetStore?.off("change", handleChange);
    };
  }, [targetStore, forceUpdate]);

  return targetStore as StoreType[T];
};

/**
 * @see For use in websocket event proxy only
 */
export const useAllStores = () => {
  const ctx = useContext(StoreContext);
  return ctx;
};
