import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Notice we're now expecting 'route' in the props to access 'route.params'
const CardView = ({ route }) => {
  // Extract 'item' from route.params
  const { item } = route.params;

  // Now you can use 'item' to access the event details
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.Name}</Text>
      <Text style={styles.date}>{item.FullDate}</Text>
      <Text style={styles.location}>{item.Location}</Text>
      <Text style={styles.description}>{item.Description}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default CardView;
