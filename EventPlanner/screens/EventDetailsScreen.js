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
import EventDetails from "../components/EventDetails"
import RSVPButton from "../components/RSVPButton";
// import { useNavigation } from "@react-navigation/native";

const EventDetailsScreen = () => {
  // const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <EventDetails eventId={""}></EventDetails>
        <RSVPButton></RSVPButton>
      </ScrollView>
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export default EventDetailsScreen;