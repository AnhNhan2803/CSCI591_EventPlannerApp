import React from 'react';
import { render } from '@testing-library/react-native';
import Calendar from '../calendar';

describe('Calendar', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Calendar />);
    expect(getByText('Calendar')).toBeTruthy();
  });

  it('displays the correct month and year', () => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const expectedMonthYear = `${monthNames[currentMonth]} ${currentYear}`;

    const { getByText } = render(<Calendar />);
    expect(getByText(expectedMonthYear)).toBeTruthy();
  });
});
