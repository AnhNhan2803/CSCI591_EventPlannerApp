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
// import { useNavigation } from "@react-navigation/native";

const CalendarScreen = () => {
  // const navigation = useNavigation();
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
