import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';
import { Text, StyleSheet } from 'react-native'; // Ensure Text and StyleSheet are imported

// Mocking the external config import to provide dummy color values for testing
jest.mock('../../config', () => ({
  colors: {
    brightBlue: 'blue', // This is a dummy value for the test
  },
}));

describe('Button', () => {
  const onPressMock = jest.fn();
  
  // Test to ensure that the Button renders with title when borderless is true
  it('renders correctly with title when borderless', () => {
    const { getByText } = render(<Button title="Press me" onPress={onPressMock} borderless={true} />);
    expect(getByText('Press me')).toBeTruthy();
  });

  // Test to ensure that the Button renders children when borderless is false
  it('renders children when provided and borderless is false', () => {
    const childText = 'Child Text';
    const { getByText } = render(
      <Button onPress={onPressMock} borderless={false}>
        <Text>{childText}</Text>
      </Button>
    );
    expect(getByText(childText)).toBeTruthy();
  });

  // Test to ensure that the onPress event is triggered
  it('calls the onPress callback when pressed', () => {
    const { getByText } = render(<Button title="Press me" onPress={onPressMock} borderless={true} />);
    fireEvent.press(getByText('Press me'));
    expect(onPressMock).toHaveBeenCalled();
  });

//   // Test to ensure that active opacity is applied when the button is pressed
//   it('applies active opacity when pressed', () => {
//     const activeOpacity = 0.5;
//     const { getByText } = render(<Button title="Press me" onPress={onPressMock} activeOpacity={activeOpacity} borderless={true} />);
//     const textElement = getByText('Press me');
//     const pressable = textElement.parentNode; // Use parentNode to reference the Pressable component

//     fireEvent.press(textElement); // Fire the press event on the textElement

//     // Flatten the style to easily access the properties
//     const buttonStyle = StyleSheet.flatten(pressable.props.style);
//     expect(buttonStyle.opacity).toBe(activeOpacity);
//   });

//   // Test to ensure that the button has default opacity when not pressed
//   it('renders with default opacity when not pressed', () => {
//     const { getByText } = render(<Button title="Press me" onPress={onPressMock} borderless={true} />);
//     const button = getByText('Press me').parentNode;

//     // Flatten the style to easily access the properties
//     const buttonStyle = StyleSheet.flatten(button.props.style);
//     expect(buttonStyle.opacity).toBe(1);
//   });
});
