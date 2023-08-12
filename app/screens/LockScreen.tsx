import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

import TextContent from '../components/TextContent';
import CustomButton from '../components/Button';

import {COLORS} from '../utils/colors';
import Route from '../utils/Route';

/**
 * LockScreen for authentication.
 */
const LockScreen: React.FC = ({navigation}: any) => {
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
          onPress={() => navigation.navigate(Route.TODO_SCREEN)}
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
