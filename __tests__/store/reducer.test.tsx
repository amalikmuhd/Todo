/* eslint-disable react/react-in-jsx-scope */
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {useReducer} from 'react';
import reducer from '../../app/store/TaskReducer';
import {ActionTypes} from '../../app/store/types';
import {act, renderHook} from '@testing-library/react-native';

const initialState = {
  tasks: [],
  taskName: '',
  editingTaskId: null,
};

describe('reducer', () => {
  it('adds a task correctly', () => {
    const store = createStore(reducer);
    const {result} = renderHook(() => useReducer(reducer, initialState), {
      wrapper: ({children}: any) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    const taskName = 'New Task';
    act(() => {
      result.current[1]({type: ActionTypes.SET_TASK_NAME, name: taskName});
      result.current[1]({type: ActionTypes.ADD_TASK});
    });

    expect(result.current[0].tasks.length).toBe(1);
    expect(result.current[0].tasks[0].name).toBe(taskName);
    expect(result.current[0].taskName).toBe('');
  });

  it('edits a task correctly', () => {
    const taskId = 1;
    const taskName = 'Edited Task';
    const initialStateWithTasks = {
      ...initialState,
      tasks: [{id: taskId, name: 'Original Task'}],
    };

    const store = createStore(reducer, initialStateWithTasks);
    const {result} = renderHook(
      () => useReducer(reducer, initialStateWithTasks),
      {
        wrapper: ({children}: any) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    act(() => {
      result.current[1]({type: ActionTypes.EDIT_TASK, id: taskId});
      result.current[1]({type: ActionTypes.SET_TASK_NAME, name: taskName});
    });

    expect(result.current[0].taskName).toBe(taskName);
    expect(result.current[0].editingTaskId).toBe(taskId);
  });

  it('updates a task correctly', () => {
    const taskId = 1;
    const updatedTaskName = 'Updated Task';

    const initialStateWithTasks = {
      ...initialState,
      tasks: [{id: taskId, name: 'Original Task'}],
      editingTaskId: taskId,
      taskName: updatedTaskName,
    };

    const store = createStore(reducer, initialStateWithTasks);
    const {result} = renderHook(
      () => useReducer(reducer, initialStateWithTasks),
      {
        wrapper: ({children}: any) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    act(() => {
      result.current[1]({type: ActionTypes.UPDATE_TASK});
    });

    expect(result.current[0].tasks[0].name).toBe(updatedTaskName);
    expect(result.current[0].taskName).toBe('');
    expect(result.current[0].editingTaskId).toBe(null);
  });

  it('removes a task correctly', () => {
    const taskId = 1;
    const initialStateWithTasks = {
      ...initialState,
      tasks: [{id: taskId, name: 'Task to Remove'}],
    };

    const store = createStore(reducer, initialStateWithTasks);
    const {result} = renderHook(
      () => useReducer(reducer, initialStateWithTasks),
      {
        wrapper: ({children}: any) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    act(() => {
      result.current[1]({type: ActionTypes.REMOVE_TASK, id: taskId});
    });

    expect(result.current[0].tasks.length).toBe(0);
  });

  it('sets task name correctly', () => {
    const newTaskName = 'New Task Name';

    const store = createStore(reducer);
    const {result} = renderHook(() => useReducer(reducer, initialState), {
      wrapper: ({children}: any) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current[1]({type: ActionTypes.SET_TASK_NAME, name: newTaskName});
    });

    expect(result.current[0].taskName).toBe(newTaskName);
  });

  it('sets tasks correctly', () => {
    const newTasks = [
      {id: 1, name: 'Task 1'},
      {id: 2, name: 'Task 2'},
    ];

    const store = createStore(reducer);
    const {result} = renderHook(() => useReducer(reducer, initialState), {
      wrapper: ({children}: any) => (
        <Provider store={store}>{children}</Provider>
      ),
    });

    act(() => {
      result.current[1]({type: ActionTypes.SET_TASKS, tasks: newTasks});
    });

    expect(result.current[0].tasks).toEqual(newTasks);
  });
});
