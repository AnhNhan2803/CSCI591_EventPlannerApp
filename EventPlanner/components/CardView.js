import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardView = ({ site, navigation }) => {
  // Destructuring the item object to get event details

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{site.Name}</Text>
      <Text style={styles.date}>{site.FullDate}</Text>
      <Text style={styles.location}>{site.Location}</Text>
      <Text style={styles.description}>{site.Description}</Text>
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
