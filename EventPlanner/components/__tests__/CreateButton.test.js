import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateButton from '../CreateButton';
import { useNavigation } from '@react-navigation/native';

// Mock the necessary module with specific implementation
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

describe('CreateButton', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    useNavigation.mockImplementation(() => ({
      navigate: navigateMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<CreateButton />);
    expect(getByTestId('create-button')).toBeTruthy();
  });

  it('navigates to CreateScreen when pressed', () => {
    const { getByTestId } = render(<CreateButton />);
    const button = getByTestId('create-button');
    fireEvent.press(button);
    expect(navigateMock).toHaveBeenCalledWith('CreateScreen');
  });
});
