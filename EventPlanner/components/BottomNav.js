import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { colors } from "../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";

const BottomNav = () => {
  const navigation = useNavigation();
  const routes = useNavigationState(state => state.routes);
  const [currentScreen, setCurrentScreen] = useState(routes[routes.length - 1].name);

  // Create an object to store animated values for each icon
  const [animatedValues, setAnimatedValues] = useState({
    CalendarScreen: new Animated.Value(1),
    HomeScreen: new Animated.Value(1),
    ProfileScreen: new Animated.Value(1)
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentRoutes = navigation.getState().routes;
      setCurrentScreen(currentRoutes[currentRoutes.length - 1].name);
    });

    return unsubscribe;
  }, [navigation]);

  const handlePress = (screen) => {
    // Trigger the bounce animation for the specific screen
    Animated.sequence([
      Animated.timing(animatedValues[screen], {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.spring(animatedValues[screen], {
        toValue: 1,
        friction: 3,
        useNativeDriver: true
      })
    ]).start();

    navigation.navigate(screen);
  };

  const renderButton = (screen, iconName, size) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress(screen)}
      >
        <Animated.View style={{ transform: [{ scale: animatedValues[screen] }] }}>
          <Icon
            name={currentScreen === screen ? iconName : `${iconName}-outline`}
            size={size}
            color={colors.white}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.bottomContainer}>
      <View style={styles.bottomRow}>
        {renderButton("CalendarScreen", "calendar", 35)}
        {renderButton("HomeScreen", "home", 35)}
        {renderButton("ProfileScreen", "person-circle", 35)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 3,
    borderColor: colors.green,
    backgroundColor: colors.maroon,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "lightgray",
    paddingVertical: 10,
  },
  button: {
    alignItems: "center",
    borderRadius: 20,
    width: 60,
    height: 60,
  },
});

export default BottomNav;
