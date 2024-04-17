import React from "react";
import { StyleSheet, Text, SafeAreaView, ScrollView } from "react-native";

import BottomNav from "../components/BottomNav";
import CreateButton from "../components/CreateButton";

// import { useNavigation } from "@react-navigation/native";

const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>This is calendar screen</Text>
      </ScrollView>
      <CreateButton />
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
