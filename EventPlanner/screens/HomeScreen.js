import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import BottomNav from "../components/BottomNav";
// import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/theme";


export const HomeScreen = () => {
  const [events, setEvents] = useState([]);

  /**
   * Turns a date into a usable object
   * 
   * @param {string} fullDate Full date separated by '/'
   * @returns {Date} Date object
   */
  const parseFullDate = (fullDate) => {
    const [month, day, year] = fullDate.split("/");
    const date = new Date(year, month - 1, day);

    if (date.exists()) return date;
  };

  /**
   * List of events after the current date
   */
  const filteredEvents = events.filter((event) => {
    const eventDate = parseFullDate(event.FullDate);
    const currentDate = new Date();
    return eventDate > currentDate;
  });

  /**
   * Sorts events by date
   * 
   * @param {list[eventData]} events list of events
   * @returns {list[eventData]} list of events sorted based on date
   */
  const sortByDate = (events) => {
    if (!events.exists()) console.error("Cannot sort events by date because there are no events!")
    return events.sort((a, b) => {
      const dateA = parseFullDate(a.FullDate);
      const dateB = parseFullDate(b.FullDate);
      return dateA - dateB;
    });
  };

  // Updates event data state based on Firestore snapshot changes
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Events"));
        const eventData = [];
        snapshot.forEach((doc) => {
          eventData.push(doc.data());
        });
        setEvents(sortByDate(eventData));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  /**
   * 
   * @param {eventData} event data object for the event
   * @returns Event JSX item
   */
  const renderItem = ({ event }) => (
    <TouchableOpacity style={styles.eventItem}>
      <Text style={styles.eventName}>{event.Name}</Text>
      <Text style={styles.eventInfo}>
        <Text style={styles.bold}>Date:</Text> {event.FullDate}{" "}
        <Text style={styles.bold}>Time:</Text> {event.time}
      </Text>
      <Text style={styles.eventInfo}>
        <Text style={styles.bold}>Location:</Text> {event.Location}
      </Text>
      <Text style={styles.eventDescription}>{event.Description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.FullDate + index}
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
