"use client";
import { StoreKeys } from "@globals";
import EventEmitter from "events";

export default class ArrayStore<T> extends EventEmitter {
  public storeName: StoreKeys = StoreKeys.None;
  protected state: Array<T> = [];

  public constructor() {
    super();
  }

  set(storeValue: T): T {
    this.state.push(storeValue);
    this.emit("change", this.state);
    return storeValue;
  }

  get(key: string, value: keyof T): T {
    return this.state.find((item: T) => item[key as keyof T] === value) as T;
  }

  getAll() {
    return this.state;
  }
}
