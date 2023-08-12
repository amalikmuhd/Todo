import React from 'react';
import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {COLORS} from '../utils/colors';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>; // Custom style for the title
}

/**
 * Simple Text Content
 *
 * @param {string} title  The title text that will show.
 * @param {StyleProp<ViewStyle>} style - Optional additional styles for the title.
 */
const TextContent: React.FC<Props> = ({title, style}) => {
  return <Text style={[styles.sectionTitle, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default TextContent;
