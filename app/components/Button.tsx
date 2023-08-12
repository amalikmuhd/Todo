import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';

import {COLORS} from '../utils/colors';

interface Props {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>; // Custom style for the button
}

/**
 * Simple Custom Button
 *
 * @param {string} label - The label text for the button.
 * @param {function} onPress - The function to be called when the button is pressed.
 * @param {StyleProp<ViewStyle>} style - Optional additional styles for the button.
 */
const CustomButton: React.FC<Props> = ({label, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.buttonStyle, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },

  buttonLabel: {
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});

export default CustomButton;
