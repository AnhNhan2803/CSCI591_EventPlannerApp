import React from "react";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import BottomNav from "../components/BottomNav";
import CreateButton from "../components/CreateButton";
// import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/theme";

export const HomeScreen = () => {
  // const navigation = useNavigation();
  const [events, setEvents] = useState([]);

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
  const parseFullDate = (fullDate) => {
    const [month, day, year] = fullDate.split("/");
    return new Date(year, month - 1, day);
  };
  const filteredEvents = events.filter((event) => {
    const eventDate = parseFullDate(event.FullDate);
    const currentDate = new Date();
    return eventDate > currentDate;
  });
  const sortByDate = (events) => {
    return events.sort((a, b) => {
      const dateA = parseFullDate(a.FullDate);
      const dateB = parseFullDate(b.FullDate);
      return dateA - dateB;
    });
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Events"));
        const eventData = [];
        querySnapshot.forEach((doc) => {
          eventData.push(doc.data());
        });
        eventData.sort((a, b) => {
          const dateA = parseFullDate(a.FullDate);
          const dateB = parseFullDate(b.FullDate);
          return dateA - dateB;
        });
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  // Render each event
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.eventItem}>
      <Text style={styles.eventName}>{item.Name}</Text>
      <Text style={styles.eventInfo}>
        <Text style={styles.bold}>Date:</Text> {item.FullDate}{" "}
        <Text style={styles.bold}>Time:</Text> {item.time}
      </Text>
      <Text style={styles.eventInfo}>
        <Text style={styles.bold}>Location:</Text> {item.Location}
      </Text>
      <Text style={styles.eventDescription}>{item.Description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.FullDate + index}
      />
      <CreateButton />
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
    color: colors.dark,
    marginBottom: 3,
  },
  bold: {
    fontWeight: "bold",
    color: colors.black,
  },
  eventDescription: {
    fontSize: 16,
    color: colors.medium,
  },
});
