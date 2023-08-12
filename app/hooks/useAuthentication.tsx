import {useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

type NavigateFunction = () => void;

/**
 * Custom Hook: useAuthentication
 *
 * @param {NavigateFunction} navigate - The navigation function to navigate on success
 */
const useAuthentication = (navigate: NavigateFunction) => {
  /**
   * Function to perform authentication using local hardware
   */
  const authenticate = useCallback(async () => {
    const hasAuthentication = await LocalAuthentication.hasHardwareAsync();

    if (hasAuthentication) {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        navigate(); // Navigate to the desired screen on successful authentication
      }
    } else {
      Alert.alert('Authentication is not setup on this device.');
    }
  }, [navigate]);

  // Perform authentication when the component mounts
  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuthentication;
