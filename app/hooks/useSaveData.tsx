import {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Custom Hook: useSaveData
 *
 * @template T - The type of data being saved
 * @param {string} key - The storage key for data storage
 * @param {T} value - The data to be saved
 */
const useSaveData = <T,>(key: string, value: T) => {
  /**
   * Function to save data to AsyncStorage
   */
  const handleSaveData = useCallback(async () => {
    try {
      // Save the provided value using the specified key
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  }, [key, value]);

  // Save data when the component mounts or when key or value changes
  useEffect(() => {
    handleSaveData();
  }, [handleSaveData, key, value]);
};

export default useSaveData;
