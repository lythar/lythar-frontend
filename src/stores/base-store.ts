"use client"
import { StoreKeys } from "@globals";
import EventEmitter from "events";

export default class Store<T, K extends string = string> extends EventEmitter {
  public storeName: StoreKeys = StoreKeys.None;
  protected state: Record<K, T> = {} as Record<K, T>;

  public constructor() {
    super();
  }

  set(key: K | "incremental", storeValue: T): T {
    if (key === "incremental") {
      const key = Object.keys(this.state).length.toString() as K;
      this.state[key] = storeValue;
    } else {
      this.state[key] = storeValue;
    }
    this.emit("change", this.state);
    return storeValue;
  }

  get(key: K): T {
    return this.state[key];
  }

  getAll(): Record<string, T> {
    return this.state;
  }
}
