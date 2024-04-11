import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";

import BottomNav from "../components/BottomNav";


const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>This is calendar screen</Text>
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
export default CalendarScreen;
