"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { $TODO, StoreKeys } from "@/lib/types";

const StoreContext = createContext<any>(null);

export const mapStores = (stores: $TODO) => {
    const obj: any = {}
    stores.forEach(store => {
        obj[store.storeName] = {}
        delete store.storeName;
        obj[store.storeName] = store;
    });

    return obj;
}
interface StoreProviderProps {
    children: Readonly<React.ReactNode>;
    stores: $TODO[];
}

export const StoreProvider = ({ children, stores}: StoreProviderProps) => {
    const [storesState, setStoresState] = useState(stores);

    useEffect(() => {
        const mappedStores = mapStores(stores);
        setStoresState(mappedStores)
    }, [stores])

    return <StoreContext.Provider value={storesState}>
        {children}
    </StoreContext.Provider>
}

export const useStore = (store: keyof typeof StoreKeys) => {
    const stores = useContext(StoreContext);
}