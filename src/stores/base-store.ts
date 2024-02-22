"use client";
import { StoreKeys } from "@globals";
import EventEmitter from "events";

export default class Store<
  T,
  K extends string | number = string
> extends EventEmitter {
  public storeName: StoreKeys = StoreKeys.None;
  protected state: Record<K, T> = {} as Record<K, T>;

  public async initialFetch(): Promise<void> {
    return;
  }

  public constructor(initialState: Record<K, T> = {} as Record<K, T>) {
    super();
    this.state = initialState;
  }

  remove(key: K): void {
    delete this.state[key];
    this.emit("change", this.state);
  }

  set(key: K, storeValue: T): T {
    this.state[key] = storeValue;
    this.emit("change", this.state);
    return storeValue;
  }

  get(key: K): T {
    return this.state[key];
  }

  getAll(): Record<K, T> {
    return this.state;
  }
}
