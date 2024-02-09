"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { StoreKeys, StoreKeysWithoutNone, StoreType } from "@/lib/types";
import { Stores } from "@/app/app/stores";

const StoreContext = createContext<any>(null);

export const mapStores = (stores: typeof Stores) => {
    const obj: StoreType = {} as StoreType;
    stores.forEach(store => {
        if(store.storeName === StoreKeys.None) return;
        obj[store.storeName] = store
    });

    return obj;
}
interface StoreProviderProps {
    children: Readonly<React.ReactNode>;
    stores: typeof Stores;
}

export const StoreProvider = ({ children, stores}: StoreProviderProps) => {
    const [storesState, setStoresState] = useState<StoreType | null>(null);

    useEffect(() => {
        const mappedStores = mapStores(stores);
        setStoresState(mappedStores)
    }, [stores])


    return <StoreContext.Provider value={storesState}>
        {children}
    </StoreContext.Provider>
}

export const useStore = (store: StoreKeysWithoutNone) => {
    const targetStore = useContext(StoreContext)?.[store]
    return targetStore as StoreType[typeof store]
}