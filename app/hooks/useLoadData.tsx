import {useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {ActionTypes} from '../store/types';
import Constants from '../utils/Constants';

const useLoadData = () => {
  const dispatch = useDispatch();

  /**
   * Function to load data from AsyncStorage
   */
  const handleLoadData = useCallback(async () => {
    try {
      // Retrieve stored data using the provided key
      const storedData = await AsyncStorage.getItem(Constants.TASK);
      if (storedData) {
        // Parse and set the retrieved data using the provided data callback
        dispatch({
          type: ActionTypes.SET_TASKS,
          tasks: JSON.parse(storedData),
        });
      }
    } catch (error) {
      console.error('Error loading task from storage:', error);
    }
  }, [dispatch]);

  // Load data when the component mounts or when key or setData changes
  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);
};

export default useLoadData;
