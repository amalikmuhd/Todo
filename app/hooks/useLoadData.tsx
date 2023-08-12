import {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Custom Hook: useLoadData
 *
 * @template T - The type of data being loaded
 * @param {string} key - The storage key for data retrieval
 * @param {function} setData - Callback to set the retrieved data
 */
const useLoadData = <T,>(key: string, setData: (data: T) => void) => {
  /**
   * Function to load data from AsyncStorage
   */
  const handleLoadData = useCallback(async () => {
    try {
      // Retrieve stored data using the provided key
      const storedData = await AsyncStorage.getItem(key);
      if (storedData) {
        // Parse and set the retrieved data using the provided setData callback
        setData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error(`Error loading ${key} from storage:`, error);
    }
  }, [key, setData]);

  // Load data when the component mounts or when key or setData changes
  useEffect(() => {
    handleLoadData();
  }, [handleLoadData, key, setData]);
};

export default useLoadData;
