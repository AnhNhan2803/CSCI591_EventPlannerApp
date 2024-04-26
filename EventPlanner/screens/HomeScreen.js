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
  const sortByDate = (events) => {
    return events.sort((a, b) => {
      const dateA = a.Date;
      const dateB = b.Date;
      return dateA - dateB;
    });
  };

  const _renderItem = ({ item }) => {
    console.log(`Rendering ${item.name}: \n${JSON.stringify(item)}`);
    return (
      <>
        <RenderItem item={item} />
      </>
    );
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
          const dateA = a.Date;
          const dateB = b.Date;
          return dateA - dateB;
        });
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
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
