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
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import BottomNav from "../components/BottomNav";
import CreateButton from "../components/CreateButton";
import { colors } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { RenderItem } from "../components/RenderItem";

export const HomeScreen = () => {
  const [events, setEvents] = useState([]);

  /**
   * List of events after the current date
   */
  const filteredEvents = events.filter((event) => {
    const eventDate = event.Date;
    const currentDate = new Date();
    return eventDate > currentDate;
  });

  /**
   * Sorts events by date
   *
   * @param {list[Object]} events list of events
   * @returns {list[Object]} list of events sorted based on date
   */

  const _renderItem = ({ item }) => {
    console.log(`Rendering ${item.title}: \n${JSON.stringify(item)}`);
    return (
      <>
        <RenderItem item={item} />
      </>
    );
  };

  useEffect(() => {
    const q = query(collection(db, "Events")); // Define the query for the collection
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const eventData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id; // Store document ID if needed
          eventData.push(data);
        });
        eventData.sort((a, b) => {
          const dateA = new Date(a.Date.seconds * 1000); // Adjust sorting if necessary
          const dateB = new Date(b.Date.seconds * 1000);
          return dateA - dateB;
        });
        setEvents(eventData);
      },
      (error) => {
        console.error("Error fetching events:", error);
      }
    );

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <BgWrapper>
      <Image source={require("../assets/wave-spacer.png")} />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={events}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item.Date + index}
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
    backgroundColor: "transparent",
    // marginTop: 20,
    paddingBottom: 80,
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
