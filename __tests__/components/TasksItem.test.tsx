import {fireEvent, render} from '@testing-library/react-native';
import TaskItem from '../../app/components/TaskItem';

describe('TaskItem', () => {
  const mockItem = {id: 1, name: 'Task'};
  const mockEditTask = jest.fn();
  const mockRemoveTask = jest.fn();

  it('renders task name', () => {
    const {getByText} = render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <TaskItem
        item={mockItem}
        editTask={mockEditTask}
        removeTask={mockRemoveTask}
      />,
    );
    const taskName = getByText('Task');
    expect(taskName).toBeDefined();
  });

  it('calls editTask when clicked', () => {
    const {getByText} = render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <TaskItem
        item={mockItem}
        editTask={mockEditTask}
        removeTask={mockRemoveTask}
      />,
    );
    const taskContainer = getByText('Task');
    fireEvent.press(taskContainer);
    expect(mockEditTask).toHaveBeenCalledWith(mockItem);
  });

  it('calls removeTask when remove button clicked', () => {
    const {getByText} = render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <TaskItem
        item={mockItem}
        editTask={mockEditTask}
        removeTask={mockRemoveTask}
      />,
    );
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);
    expect(mockRemoveTask).toHaveBeenCalledWith(1); // Assuming the id is 1
  });
});
