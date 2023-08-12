import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../utils/colors';

interface Props {
  item: {id: number; name: string};
  editTask: (item: {id: number; name: string}) => void;
  removeTask: (itemId: number) => void;
}

/**
 * Simple Task Item
 *
 * @param item - The task item data containing id and name.
 * @param editTask - Function to handle editing the task.
 * @param removeTask - Function to remove the task.
 * @returns {JSX.Element} - The JSX representation of the task item.
 */
const TaskItem: React.FC<Props> = ({item, editTask, removeTask}) => {
  return (
    <TouchableOpacity
      onPress={() => editTask(item)}
      style={styles.taskContainer}>
      <View style={styles.row}>
        <View style={styles.circle} />
        <Text style={styles.titleStyle}>{item.name}</Text>
      </View>
      <TouchableOpacity onPress={() => removeTask(item.id)}>
        <Text style={styles.labelStyle}>Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 14,
    width: '100%',
  },

  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  circle: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 24,
    width: 24,
  },

  titleStyle: {
    fontSize: 16,
    fontWeight: '300',
  },

  labelStyle: {
    fontWeight: '300',
    textTransform: 'uppercase',
  },
});

export default TaskItem;
