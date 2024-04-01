import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";
import BottomNav from "../components/BottomNav";
// import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/theme";
import { signOut } from "firebase/auth";

import { auth } from "../config";

export const HomeScreen = () => {
  // const navigation = useNavigation();

  // Sign out functionality
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  //data for events -- will eventually use firebase
  const eventsData = [
    {
      id: 1,
      name: "Concert",
      date: "March 28, 2024",
      description: "UM Band Concert",
      location: "Adams Center",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Group Meeting",
      date: "April 2, 2024",
      description: "Meeting for our group",
      location: "SS 402",
      time: "2:00 PM",
    },
    // Add more events as needed
  ];

  // Render each event
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventInfo}>
        <Text style={styles.bold}>Date:</Text> {item.date}{" "}
        <Text style={styles.bold}>Time:</Text> {item.time}
      </Text>
      <Text style={styles.eventInfo}>
        <Text style={styles.bold}>Location:</Text> {item.location}
      </Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Sign Out" onPress={handleLogout} />
      <FlatList
        data={eventsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    // marginTop: 20,
  },
  eventItem: {
    backgroundColor: colors.white,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventInfo: {
    fontSize: 16,
    color: colors.medium,
    marginBottom: 3,
  },
  bold: {
    fontWeight: "bold",
    color: colors.dark,
  },
  eventDescription: {
    fontSize: 16,
    color: colors.light,
  },
});
