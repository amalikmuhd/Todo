import {Task} from '../interface/Task';

// Definition of the 'State' interface representing the state structure
export interface State {
  tasks: Task[];
  taskName: string;
  editingTaskId: number | null;
}

// Enumeration of possible action types using the 'ActionTypes' enum
export enum ActionTypes {
  ADD_TASK = 'ADD_TASK',
  EDIT_TASK = 'EDIT_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  SET_TASK_NAME = 'SET_TASK_NAME',
  SET_TASKS = 'SET_TASKS',
}

// Union type 'Action' representing all possible action objects
export type Action =
  | {type: ActionTypes.ADD_TASK}
  | {type: ActionTypes.EDIT_TASK; id: number}
  | {type: ActionTypes.UPDATE_TASK}
  | {type: ActionTypes.REMOVE_TASK; id: number}
  | {type: ActionTypes.SET_TASK_NAME; name: string}
  | {type: ActionTypes.SET_TASKS; tasks: Task[]};
