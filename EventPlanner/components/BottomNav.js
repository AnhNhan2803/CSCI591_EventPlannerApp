import React from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CalendarScreen")}
          >
            <Image
              source={require("../assets/calendar.png")}
              style={styles.buttonNav}
            />
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Image
              source={require("../assets/home.png")}
              style={styles.buttonNav}
            />
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Image
              source={require("../assets/user.png")}
              style={styles.buttonNav}
            />
            <Text style={styles.buttonText}>Favorites</Text>
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
    borderTopWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "white",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "lightgray",
    paddingVertical: 10,
    backgroundColor: "white",
    opacity: 0.7,
  },
  button: {
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
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
