import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import { colors } from "../constants/theme";
import { auth } from "../config/firebase";

/**
 * Renders an item on the home page.
 *
 * @param {Object} item Event details object from Firestore
 * @returns JSX Object
 */
export const RenderItem = ({ item }) => {
  const [bookmarked, setBookmarked] = useState(() => {
    if (!auth.currentUser.bookmarks) {
      auth.currentUser.bookmarks = [];
      return false;
    }
    return auth.currentUser.bookmarks.includes(item.id);
  });
  const animationScale = new Animated.Value(1);
  const navigation = useNavigation();

  const addBookmarkToUser = (eventId) => {
    // Add the eventId to the bookmarks array if bookmarked is true
    if (bookmarked) {
      // Ensure the eventId is not already in the array to avoid duplicates
      if (!auth.currentUser.bookmarks.includes(eventId)) {
        auth.currentUser.bookmarks.push(eventId);
      }
    } else {
      // Remove the eventId from the bookmarks array if bookmarked is false
      auth.currentUser.bookmarks = auth.currentUser.bookmarks.filter(
        (id) => id !== eventId
      );
    }
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);

    addBookmarkToUser(item.id);

    Animated.sequence([
      Animated.timing(animationScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(animationScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  function formatDateAndTime(firestoreTimestamp) {
    // Check if the object is a Firestore Timestamp
    // if (!(firestoreTimestamp instanceof Timestamp)) {
    //   throw new Error("Invalid input: expected a Firestore Timestamp");
    // }

    // Convert Firestore Timestamp to JavaScript Date object
    const dateObject = firestoreTimestamp.toDate();

    // Format the month, day, and year
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    const year = dateObject.getFullYear();

    // Format the hours for 12-hour format and determine AM or PM
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, "0") : "12"; // Adjust hour '0' to '12'

    // Construct date and time strings
    const dateString = `${month}/${day}/${year}`;
    const timeString = `${hours}:${minutes} ${ampm}`;

    // Return the formatted date and time
    return [dateString, timeString];
  }
  const [dateString, timeString] = formatDateAndTime(item.Date);
  console.log(item);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.eventItem}
        onPress={() => {
          console.log("Item being passed:", item);
          navigation.navigate("EventDetailsScreen", { item });
        }}
      >
        <Text style={styles.eventName}>{item.title}</Text>
        <Text style={styles.eventInfo}>
          <Text style={styles.bold}>Date:</Text> {dateString}{" "}
          <Text style={styles.bold}>Time:</Text> {timeString}
        </Text>
        <Text style={styles.eventInfo}>
          <Text style={styles.bold}>Location:</Text> {item.location}
        </Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          transform: [{ scale: animationScale }],
          zIndex: 1, // Ensure the bookmark button is clickable above all other elements
        }}
      >
        <TouchableOpacity onPress={toggleBookmark}>
          <Icon
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={35}
            color={colors.maroon}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  eventItem: {
    backgroundColor: colors.white,
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
