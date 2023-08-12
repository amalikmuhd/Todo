import React, {useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

// Components
import TextContent from '../components/TextContent';
import CustomButton from '../components/Button';
import TaskItem from '../components/TaskItem';

// Interface
import {Task} from '../interface/Task';

// Util
import {COLORS} from '../utils/colors';
import useLoadData from '../hooks/useLoadData';
import useSaveData from '../hooks/useSaveData';
import Constants from '../utils/Constants';

/**
 * TodoScreen for creating and managing tasks.
 */
const TaskScreen: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // List of tasks
  const [taskName, setTaskName] = useState<string>(''); // Input value for task name
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null); // Id of task being edited or null
  const taskInputRef = useRef<TextInput | null>(null); // Ref to the input field for tasks

  // Add task
  const addTask = () => {
    // Check if the taskName input is not empty after trimming
    if (taskName.trim() !== '') {
      // Create a new item object with a unique id and the entered task name
      const newItem: Task = {
        id: Date.now(), // Use the current timestamp as a unique identifier
        name: taskName,
      };
      // Update the tasks list by adding the new item
      setTasks([...tasks, newItem]);
      // Clear the taskName input field for the next entry
      setTaskName('');
    }
  };

  // Edit Task
  const editTask = (itemId: number) => {
    // Find the task with the given itemId from the tasks list
    const itemToEdit = tasks.find(item => item.id === itemId);
    // Force the TextInput to focus
    taskInputRef.current?.focus();
    // Check if the task is found
    if (itemToEdit) {
      // Set the task name in the input field for editing
      setTaskName(itemToEdit.name);
      // Set the editingTaskId to the itemId being edited
      setEditingTaskId(itemId);
    }
  };

  // Update Task
  const updateTask = () => {
    // Check if the input has a valid name and an item is being edited
    if (taskName.trim() !== '') {
      // Create an updated item object with the new name
      const updatedItems: Task[] = tasks.map(item =>
        item.id === editingTaskId ? {...item, name: taskName} : item,
      );

      // Update the states of the tasks
      setTasks(updatedItems);

      // Clear the input field and reset editing state
      setTaskName('');
      setEditingTaskId(null);
    }
  };

  // Remove Task
  const removeTask = (itemId: number) => {
    // Filter out the task with the specified itemId from the tasks list
    const updatedItems: Task[] = tasks.filter(item => item.id !== itemId);
    // Update the tasks list with the filtered array of items
    setTasks(updatedItems);
  };

  // Load data from AsyncStorage when the component mounts
  useLoadData(Constants.TASK, setTasks);

  // Save items to AsyncStorage whenever the items state changes
  useSaveData(Constants.TASK, tasks);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.topContainer}>
        <TextContent title="TODO:" />
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TaskItem
              item={item}
              editTask={() => editTask(item.id)}
              removeTask={() => removeTask(item.id)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.bottomContainer}>
        <View style={styles.bottomChildContainer}>
          {/* Text Input */}
          <TextInput
            placeholder="Enter here"
            value={taskName}
            ref={taskInputRef}
            onChangeText={text => setTaskName(text)}
            style={styles.inputContainer}
          />
          {/* Add or Update button */}
          <CustomButton
            label={editingTaskId !== null ? 'Update' : 'Add'}
            onPress={() => {
              editingTaskId !== null ? updateTask() : addTask();
              Keyboard.dismiss();
            }}
          />
        </View>
      </KeyboardAvoidingView>
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

  bottomContainer: {
    backgroundColor: 'transparent',
    bottom: Platform.OS === 'android' ? 0 : 40,
    position: 'absolute',
    width: '100%',
  },

  bottomChildContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '90%',
  },

  inputContainer: {
    backgroundColor: 'white',
    flex: 1,
    height: 44,
    marginVertical: 10,
    marginRight: 10,
    paddingLeft: 20,
  },
});

export default TaskScreen;
