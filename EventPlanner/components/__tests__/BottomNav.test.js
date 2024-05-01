import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BottomNav from '../BottomNav';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  }));
  

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

describe('BottomNav', () => {
  const navigateMock = jest.fn();

  beforeEach(() => {
    // Mock the navigation hook before each test
    useNavigation().navigate = navigateMock;
  });


  it('renders correctly', () => {
    const { getByTestId } = render(<BottomNav />);
    expect(getByTestId('bottom-nav-container')).toBeTruthy(); 
  });

//   it('navigates to CalendarScreen when calendar button is pressed', () => {
//     const { getByTestId } = render(<BottomNav />);
//     const calendarButton = getByTestId('calendar-button');
//     // Access the onPress prop directly and call it
//     calendarButton.props.onPress();
//     expect(navigateMock).toHaveBeenCalledWith('CalendarScreen');
//   });

//   it('navigates to HomeScreen when home button is pressed', () => {
//     const { getByTestId } = render(<BottomNav />);
//     const homeButton = getByTestId('home-button');
//     fireEvent.press(homeButton);
//     expect(navigateMock).toHaveBeenCalledWith('HomeScreen');
//   });

//   it('navigates to ProfileScreen when profile button is pressed', () => {
//     const { getByTestId } = render(<BottomNav />);
//     const profileButton = getByTestId('profile-button');
//     fireEvent.press(profileButton);
//     expect(navigateMock).toHaveBeenCalledWith('ProfileScreen');
//   });
});
