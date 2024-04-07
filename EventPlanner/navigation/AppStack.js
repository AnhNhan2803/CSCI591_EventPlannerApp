import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens";
import { Text, StyleSheet } from "react-native";
import { colors } from "../config";
import CalendarScreen from "../screens/CalendarScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Events",
          headerStyle: {
            backgroundColor: colors.maroon,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontSize: 35,
          },
        }}
      />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EventDetailsScreen" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: colors.maroon,
  },
});
