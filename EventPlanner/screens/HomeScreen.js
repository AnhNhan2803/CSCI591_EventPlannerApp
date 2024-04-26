import React from "react";
import { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import BottomNav from "../components/BottomNav";
import CreateButton from "../components/CreateButton";
// import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  // const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const navigation = useNavigation();

  /**
   * Turns a date into a usable object
   *
   * @param {string} fullDate Full date separated by '/'
   * @returns {Date} Date object
   */
  const parseFullDate = (fullDate) => {
    const [month, day, year] = fullDate.split("/");
    return new Date(year, month - 1, day);
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
   * Sofrts events by date
   *
   * @param {list[Object]} events list of events
   * @returns {list[Object]} list of events sorted based on date
   */
  const sortByDate = (events) => {
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

  /**
   * Renders an event
   *
   * @param {eventData} event data object for the event
   * @returns Event JSX item
   */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate("CardView", { item, navigation })}
    >
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
    <BgWrapper>
      <Image source={require('../assets/wave-spacer.png')} />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.FullDate + index}
        />
        <CreateButton />
        <BottomNav />
      </SafeAreaView>
    </BgWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
  }
});

