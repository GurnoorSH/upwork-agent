import { STORAGE_KEYS } from "../shared/constants";

export const storageKeys = STORAGE_KEYS;

export type StorageKey = (typeof storageKeys)[keyof typeof storageKeys];
