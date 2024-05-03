import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";

import BottomNav from "../components/BottomNav";
import EventDetails from "../components/EventDetails";
import RSVPButton from "../components/RSVPButton";
// import { useNavigation } from "@react-navigation/native";
const EventDetailsScreen = ({ route, navigation }) => {
  console.log("Complete route object:", route);

  if (!route.params?.item) {
    console.error("No item found in navigation parameters.");
    return <Text>No event details available.</Text>;
  }

  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <EventDetails item={item}></EventDetails>
      {/* <RSVPButton></RSVPButton> */}

      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "100%",
  },
});

export default EventDetailsScreen;
