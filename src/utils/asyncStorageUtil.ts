/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageKeys = {
  SEARCH_HISTORY: 'SEARCH_HISTORY',
} as const;

export type StorageKeysType = (typeof StorageKeys)[keyof typeof StorageKeys];

class StorageUtility {
  static async setItem<T>(key: StorageKeysType, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  static async getItem<T>(key: StorageKeysType): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const value = jsonValue != null ? JSON.parse(jsonValue) : null;
      return value;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async removeItem(key: StorageKeysType): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  static async getMultipleItems(
    keys: Array<StorageKeysType>
  ): Promise<Record<StorageKeysType, any> | undefined> {
    try {
      const result = await AsyncStorage.multiGet(keys);
      const final = result.reduce(
        (pre: any, curr: any[]) => {
          const val = curr[1] ? JSON.parse(curr[1]) : null;
          return {
            ...pre,
            [curr[0]]: val,
          };
        },
        {} as Record<StorageKeysType, any>
      );
      return final;
    } catch (err) {
      console.log(err);
    }
  }
}

export { StorageUtility, StorageKeys };