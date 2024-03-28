import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Calendar</Text>
        <Text style={styles.month}>
          {this.state.monthNames[this.state.currentMonth]} {this.state.currentYear}
        </Text>
        {/* Placeholder for dates will go here */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  month: {
    fontSize: 18,
  },
});
