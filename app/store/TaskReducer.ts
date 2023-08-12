import {Task} from '../interface/Task';
import {State, Action, ActionTypes} from './types';

// Initial state for task management
const initialState: State = {
  tasks: [], // List to store tasks
  taskName: '', // Current task name being edited
  editingTaskId: null, // ID of the task being edited
};

// Reducer function for handling actions and state updates
const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    // Action type: Add a new task
    case ActionTypes.ADD_TASK:
      // Check if the task name is not empty
      if (state.taskName.trim() !== '') {
        // Create a new task object with a unique id and the entered task name
        const newTask: Task = {
          id: Date.now(), // Generate a unique ID using the current timestamp
          name: state.taskName, // Use the current task name
        };
        // Return the updated state with the new task added
        return {
          ...state,
          tasks: [...state.tasks, newTask],
          taskName: '', // Clear the task name after adding
        };
      }
      // If task name is empty, return the current state
      return state;

    // Action type: Edit a task
    case ActionTypes.EDIT_TASK:
      // Find the task to edit based on the provided ID
      const taskToEdit = state.tasks.find(task => task.id === action.id);
      // If the task to edit is found, update the state
      if (taskToEdit) {
        return {
          ...state,
          taskName: taskToEdit.name, // Set current task name for editing
          editingTaskId: action.id, // Set the ID of the task being edited
        };
      }
      // If the task to edit is not found, return the current state
      return state;

    // Action type: Update a task
    case ActionTypes.UPDATE_TASK:
      // Check if the task name is not empty and there's an editingTaskId
      if (state.taskName.trim() !== '' && state.editingTaskId !== null) {
        // Map through tasks and update the edited task
        const updatedTasks: Task[] = state.tasks.map(
          task =>
            task.id === state.editingTaskId
              ? {...task, name: state.taskName} // Update the name of the edited task
              : task, // Keep other tasks unchanged
        );
        // Return the updated state with the task list and editingTaskId reset
        return {
          ...state,
          tasks: updatedTasks,
          taskName: '', // Clear the task name after updating
          editingTaskId: null, // Reset the editingTaskId after updating
        };
      }
      // If task name is empty or there's no editingTaskId, return the current state
      return state;

    // Action type: Remove a task
    case ActionTypes.REMOVE_TASK:
      // Filter out the task with the provided ID from the tasks list
      const updatedTasks: Task[] = state.tasks.filter(
        task => task.id !== action.id,
      );
      // Return the updated state with the task list after removing the task
      return {
        ...state,
        tasks: updatedTasks,
      };

    // Action type: Set the current task name
    case ActionTypes.SET_TASK_NAME:
      // Update the taskName in the state with the provided name
      return {
        ...state,
        taskName: action.name,
      };

    // Action type: Set the tasks list
    case ActionTypes.SET_TASKS:
      // Update the tasks list in the state with the provided list
      return {
        ...state,
        tasks: action.tasks,
      };

    // Default case: Return the current state for unknown actions
    default:
      return state;
  }
};

export default reducer;
