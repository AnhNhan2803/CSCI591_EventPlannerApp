import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { colors } from '../constants/theme';

const MaroonButton = ({ buttonText, onPress, disabled, style, textStyle }) => {
  return (
    <TouchableOpacity
      style={[styles.button, Platform.OS === 'android' && styles.androidButton, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.title, Platform.OS === 'android' && styles.androidTitle, textStyle]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.maroon,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidButton: {
    elevation: 2, // Add elevation for Android
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  androidTitle: {
    // Add Android-specific styles for the title if needed
  },
});

export default MaroonButton;