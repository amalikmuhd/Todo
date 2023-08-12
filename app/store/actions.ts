import {Task} from '../interface/Task';
import {ActionTypes} from './types';

// Action creator: Add a new task
export const addTask = () => ({
  type: ActionTypes.ADD_TASK,
});

// Action creator: Edit a task
export const editTask = (id: number) => ({
  type: ActionTypes.EDIT_TASK,
  id,
});

// Action creator: Update a task
export const updateTask = () => ({
  type: ActionTypes.UPDATE_TASK,
});

// Action creator: Remove a task
export const removeTask = (id: number) => ({
  type: ActionTypes.REMOVE_TASK,
  id,
});

// Action creator: Set the current task name
export const setTaskName = (name: string) => ({
  type: ActionTypes.SET_TASK_NAME,
  name,
});

// Action creator: Set the tasks list
export const setTasks = (tasks: Task[]) => ({
  type: ActionTypes.SET_TASKS,
  tasks,
});
