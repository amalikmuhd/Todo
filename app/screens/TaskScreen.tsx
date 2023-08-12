import React, {useRef} from 'react';
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

// Util
import {COLORS} from '../utils/colors';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {
  addTask,
  editTask,
  removeTask,
  setTaskName,
  updateTask,
} from '../store/actions';
import {State} from '../store/types';
import useLoadData from '../hooks/useLoadData';
import useSaveData from '../hooks/useSaveData';
import Constants from '../utils/Constants';

/**
 * TodoScreen for creating and managing tasks.
 */
const TaskScreen: React.FC = () => {
  const tasks = useSelector((state: State) => state.tasks); // Select the tasks part of the state
  const taskName = useSelector((state: State) => state.taskName); // Select the taskName part of the state
  const editingTaskId = useSelector((state: State) => state.editingTaskId); // Select the editingTaskId part of the state
  const taskInputRef = useRef<TextInput | null>(null); // Ref to the input field for tasks

  const dispatch = useDispatch();

  const onAddTask = () => dispatch(addTask());
  const onEditTask = (taskId: number) => dispatch(editTask(taskId));
  const onUpdateTask = () => dispatch(updateTask());
  const onRemoveTask = (taskId: number) => dispatch(removeTask(taskId));
  const onSetTaskName = (text: string) => dispatch(setTaskName(text));

  // Load data from AsyncStorage when the component mounts
  useLoadData();

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
              editTask={() => {
                taskInputRef.current?.focus();
                onEditTask(item.id);
              }}
              removeTask={() => onRemoveTask(item.id)}
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
            onChangeText={onSetTaskName}
            style={styles.inputContainer}
          />
          {/* Add or Update button */}
          <CustomButton
            label={editingTaskId !== null ? 'Update' : 'Add'}
            onPress={() => {
              editingTaskId !== null ? onUpdateTask() : onAddTask();
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
