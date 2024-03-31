import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Search from "./SearchBar";
import { colors } from "./constants/theme";
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.header}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: true,
          contentStyle: {
            backgroundColor: colors.dark,
          }
        }}
      >
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
            }
          }}
        />
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.maroon,
  },
});
