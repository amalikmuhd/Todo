import React, {useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

import TextContent from '../components/TextContent';
import CustomButton from '../components/Button';

import {COLORS} from '../utils/colors';
import Route from '../utils/Route';

/**
 * LockScreen for authentication.
 */
const LockScreen: React.FC = ({navigation}: any) => {
  // Function to handle authentication
  const authenticate = useCallback(async () => {
    const hasAuthentication = await LocalAuthentication.hasHardwareAsync();

    if (hasAuthentication) {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        navigation.navigate(Route.TODO_SCREEN);
      }
    } else {
      Alert.alert('Authentication is not setup on this device.');
    }
  }, [navigation]);

  // Trigger authentication on component mount
  useEffect(() => {
    authenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <TextContent
          style={styles.titleStyle}
          title="Set Authentication to Proceed"
        />
        <CustomButton
          style={styles.buttonStyle}
          label="Go to settings"
          onPress={() => {
            Platform.OS === 'ios'
              ? Linking.openSettings() // Open settings for iOS
              : Linking.sendIntent('android.settings.SECURITY_SETTINGS'); // Open security settings for Android
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'flex-end',
  },

  container: {
    alignItems: 'center',
  },

  titleStyle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textTransform: 'capitalize',
  },

  buttonStyle: {
    borderRadius: 24,
    marginVertical: 10,
    paddingVertical: 14,
  },
});

export default LockScreen;
