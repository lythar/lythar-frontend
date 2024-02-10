"use client"
import { StoreKeys } from "../types/globals";

export default class Store<T, K extends string = string> {
    public storeName: StoreKeys = StoreKeys.None
    protected state: Record<K, T> = {} as Record<K, T>

    public constructor() {};

    set(key: K, storeValue: T): T {
        this.state[key] = storeValue;
        return storeValue;
    }

    get(key: K): T {
        return this.state[key]
    }
}