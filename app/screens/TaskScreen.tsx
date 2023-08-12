import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import TextContent from '../components/TextContent';
import CustomButton from '../components/Button';

import {COLORS} from '../utils/colors';

/**
 * TodoScreen for authentication.
 */
const TaskScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.topContainer}>
        <TextContent title="TODO:" />
        <CustomButton label="Go to settings" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLORS.gray,
    flex: 1,
  },

  topContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
});

export default TaskScreen;
