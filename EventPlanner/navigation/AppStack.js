import * as React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { HomeScreen } from "../screens";
import { StyleSheet } from "react-native";
import { colors } from "../config";
import CalendarScreen from "../screens/CalendarScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreateScreen from "../screens/CreateScreen";
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
          headerStyle: styles.headerStyle,
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontSize: 35,
          },
        }}
      />

      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          animationEnabled: false,
          title: "Calendar",
          headerStyle: styles.headerStyle,
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontSize: 35,
          },
        }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          animationEnabled: false,
          title: "Profile",
          headerStyle: styles.headerStyle,
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontSize: 35,
          },
        }}
      />

      <Stack.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          title: "New Event",
          headerStyle: styles.headerStyle,
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontSize: 35,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS // Slide-up animation
        }}
      />

      <Stack.Screen
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{
          animationEnabled: false,
          title: "Details",
          headerStyle: styles.headerStyle,
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontSize: 35,
          },
        }}
      />

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
  headerStyle: {
    backgroundColor: colors.maroon,
    borderBottomWidth: 0,
    borderBottomColor: colors.green,
    shadowOpacity: 0,
  }
});
