import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/theme";
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNav = () => {
  const navigation = useNavigation();
  const iconSize = 20;

  return (
    <>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CalendarScreen")}
          >
            <Icon
              name="calendar-outline"
              size={iconSize}
              color={colors.maroon}
            />
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Icon
              name="home-outline"
              size={iconSize}
              color={colors.maroon}
            />
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Icon
              name="person-circle-outline"
              size={iconSize}
              color={colors.maroon}
            />
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 3,
    borderColor: colors.green,
    backgroundColor: colors.white,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 3,
    borderColor: colors.tan,
    paddingVertical: 10,
    backgroundColor: "white",
    opacity: 0.7,
    marginBottom: 15,
  },
  button: {
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: colors.maroon,
    textAlign: "center",
    fontSize: 14,
    flex: 1,
  },
  hidden: {
    display: "none", // Hide the bottom nav when the screen is not focused
  },
  buttonNav: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
});

export default BottomNav;
