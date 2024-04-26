import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  Switch,
  Button,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { signOut } from "firebase/auth";

import BottomNav from "../components/BottomNav";
import { colors } from "../constants/theme";
import { auth } from "../config";
import BgWrapper from "../components/BgWrapper";

/**
 * Profile Screen
 *
 * Where the user can adjust their profile and settings. Possible where
 * the user can requrest access to upgrade acount to super user status.
 */
const ProfileScreen = ({ navigation }) => {
  const [pushNotification, setPushNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  // Updates userObject on page focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUser(auth.currentUser);
    });

    return unsubscribe;
  }, [navigation]);

  // Updates the state of the sliders
  useEffect(() => {
    if (!user) return;
    user.isPushNotification
      ? setPushNotification(true)
      : setPushNotification(false);
    user.isEmailNotification
      ? setEmailNotification(true)
      : setEmailNotification(false);
  }, [user]);

  /**
   * Handles the state of push notifications in DOM and Firebase
   *
   * @param {boolean} value
   */
  function handlePushNotificationChange(value) {
    setPushNotification(value);
    // Call some function here to enable push notifications on device
    auth.currentUser.isPushNotification = value;
  }

  /**
   * Handles the state of email notifications in DOM and Firebase
   *
   * @param {boolean} value
   */
  function handleEmailNotificationChange(value) {
    setEmailNotification(value);
    // Call some function here to enable email notifications on device
    auth.currentUser.isEmailNotification = value;
  }

  /**
   * Handles button press to sign out user
   */
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  // DEPRICATED: Sign in functionality
  const handleSignIn = () => {
    console.log("SIGN IN PRESSED");
  };

  // DEPRICATED: Sign in functionality
  const handleRegister = () => {
    console.log("REGISTER PRESSED");
  };

  return (
    <BgWrapper>
      <SafeAreaView style={{ flex: 1 }}>
        <Image source={require("../assets/wave-spacer.png")} />
        <View style={styles.container}>
          {/* Scroll portion */}
          <View style={styles.scrollWrapper}>
            {/* <ScrollView> */}
            {/* Header portion */}
            <View style={styles.headerContainer}>
              <View style={styles.avatarWrapper}>
                {/* TODO: This Icon should be an image accessed from firestore uploaded by the user */}
                <Icon
                  name="person-circle-outline"
                  size={120}
                  color={colors.maroon}
                />
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.name}>
                  {user ? user.email : "Loading..."}
                </Text>
                <Text style={styles.name}>
                  {user ? (user.isAdmin ? "Student" : "Admin") : "Loading..."}
                </Text>
              </View>
            </View>

            <Text style={styles.rowTitle}>PREFERENCES</Text>

            {/* Setting items */}
            <View style={styles.rowContainer}>
              <TouchableOpacity style={styles.rowItemContainer}>
                <View style={styles.row}>
                  <Icon
                    name="notifications-outline"
                    size={35}
                    color={colors.maroon}
                  />
                  <Text style={styles.rowLabel}>Push Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    trackColor={{ true: colors.maroon, false: colors.medium }}
                    onValueChange={(newValue) => {
                      handlePushNotificationChange(newValue);
                    }}
                    value={pushNotification}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowItemContainer}>
                <View style={styles.row}>
                  <Icon name="mail-outline" size={35} color={colors.maroon} />
                  <Text style={styles.rowLabel}>Email Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    trackColor={{ true: colors.maroon, false: colors.medium }}
                    onValueChange={(newValue) => {
                      handleEmailNotificationChange(newValue);
                    }}
                    value={emailNotification}
                  />
                </View>
              </TouchableOpacity>
              {/* Conditionally renders sign out button if based on whether userObject exists */}
              {user ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity>
                    <View style={styles.button}>
                      <Button
                        title="Sign Out"
                        onPress={handleLogout}
                        color={"transparent"}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity>
                    <View style={styles.button}>
                      <Button
                        title="Sign In"
                        onPress={handleSignIn}
                        color={colors.white}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.button}>
                      <Button
                        title="Register"
                        onPress={handleRegister}
                        color={colors.white}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* </ScrollView> */}
          </View>
        </View>

        {/* Render NavBar */}
        <BottomNav />
      </SafeAreaView>
    </BgWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "flex-start",
    backgroundColor: "transparent",
  },
  headerContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    backgroundColor: "transparent",
  },
  avatarWrapper: {
    position: "relative",
  },
  headerTextContainer: {
    position: "relative",
    flex: 1,
    alignItems: "center",
  },
  scrollWrapper: {
    flex: 1,
  },
  title: {
    color: colors.white,
  },
  header: {
    color: colors.white,
  },
  rowTitle: {
    color: colors.medium,
    fontSize: 12,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  rowContainer: {
    alignSelf: "center",
    flex: 1,
    width: "90%",
    alignItems: "center",
  },
  rowItemContainer: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: colors.light,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowLabel: {
    paddingLeft: 16,
    fontSize: 16,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  button: {
    backgroundColor: colors.maroon,
    color: colors.white,
    padding: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    paddingHorizontal: 10,
    gap: 15,
  },
});

export default ProfileScreen;
