import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";

const EventDetails = ({ item }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const animationScale = new Animated.Value(1);

  useEffect(() => {
    const checkBookmarks = () => {
      if (auth.currentUser && auth.currentUser.bookmarks) {
        setBookmarked(auth.currentUser.bookmarks.includes(item.id));
      }
    };

    checkBookmarks();
  }, [item.id]);

  const addBookmarkToUser = (eventId) => {
    if (!auth.currentUser) {
      console.error("User not logged in");
      return;
    }

    let bookmarks = auth.currentUser.bookmarks || [];
    if (bookmarked) {
      if (!bookmarks.includes(eventId)) {
        bookmarks.push(eventId);
      }
    } else {
      bookmarks = bookmarks.filter((id) => id !== eventId);
    }
    auth.currentUser.bookmarks = bookmarks; // This will need actual API calls to update in backend or use state management
  };

  const toggleBookmark = () => {
    if (!auth.currentUser) {
      console.error("User not logged in");
      return;
    }
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.sv}>
        <Text style={styles.title}>{item.title}</Text>
        <Animated.View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            transform: [{ scale: animationScale }],
            zIndex: 1,
          }}
        >
          <TouchableOpacity onPress={toggleBookmark}>
            <Icon
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={30}
              color="#c59613"
            />
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>When</Text>
          <Text style={styles.sectionContent}>
            {item.Date.seconds
              ? new Date(item.Date.seconds * 1000).toLocaleDateString() +
                ", " +
                new Date(item.Date.seconds * 1000).toLocaleTimeString()
              : "Date not available"}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Where</Text>
          <Text style={styles.sectionContent}>{item.location}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Organized by</Text>
          <Text style={styles.sectionContent}>{item.organizer}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.tagsContainer}>
          {item.tags &&
            item.tags.split(", ").map((tag, index) => (
              <Text key={index} style={styles.tag}>
                {tag}
              </Text>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  sv: {
    width: "100%",
    padding: 20,
    flex: 3,
    height: "100%",
  },
  container: {
    padding: 20,
    backgroundColor: "#ffffff", // white background
    borderRadius: 12,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: "#000000",
    shadowOffset: { height: 2, width: 0 },
    elevation: 5, // for Android shadow
    margin: 10,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333", // dark text color for the title
    marginBottom: 16,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444444", // dark gray for subtitles
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    color: "#666666", // lighter gray for content
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: "#4a4a4a", // medium gray
    marginBottom: 12,
    lineHeight: 24,
    borderTopColor: "#e0e0e0",
    borderTopWidth: 1,
    paddingTop: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#e0e0e0",
    color: "#333333",
    fontSize: 12,
    marginRight: 8,
    marginBottom: 8,
    padding: 8,
    borderRadius: 15,
    overflow: "hidden",
  },
});
