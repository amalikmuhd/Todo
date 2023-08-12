import React from 'react';
import {StyleSheet, View, SafeAreaView, Platform, Linking} from 'react-native';

import TextContent from '../components/TextContent';
import CustomButton from '../components/Button';

import {COLORS} from '../utils/colors';
import Route from '../utils/Route';
import useAuthentication from '../hooks/useAuthentication';

/**
 * LockScreen for authentication.
 */
const LockScreen: React.FC = ({navigation}: any) => {
  const navigateToTodoScreen = () => {
    navigation.navigate(Route.TODO_SCREEN);
  };

  // Use the useAuthentication hook
  useAuthentication(navigateToTodoScreen);

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
