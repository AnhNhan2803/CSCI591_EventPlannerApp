import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const RSVPButton = ({ onRSVP }) => {
  return (
    <TouchableOpacity onPress={onRSVP}>
      <Text>RSVP to Event</Text>
    </TouchableOpacity>
  );
};

export default RSVPButton;
