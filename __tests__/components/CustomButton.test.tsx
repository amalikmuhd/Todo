import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomButton from '../../app/components/Button';

describe('CustomButton', () => {
  it('renders correctly with label', () => {
    const {getByText} = render(
      <CustomButton label="Test Button" onPress={() => {}} />,
    );
    const buttonLabel = getByText('Test Button');
    expect(buttonLabel).toBeDefined();
  });

  it('calls onPress when button is pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <CustomButton label="Test Button" onPress={onPressMock} />,
    );
    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
