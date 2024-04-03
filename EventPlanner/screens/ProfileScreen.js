import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  SectionList,
  StatusBar,
  Switch,
  Button
} from "react-native";
import BottomNav from "../components/BottomNav";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../constants/theme";



/**
 * User Profile Screen
 * 
 * Where the user can adjust their profile and settings. Possible where
 * the user can requrest access to upgrade acount to super user status.
 *  
 * @returns void
 */
const ProfileScreen = () => {
  const [pushNotification, setPushNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);

  const userObject = false;

  function handlePushNotificationChange(value) {
    setPushNotification(value);
    // Call some function here to enable push notifications on device
  }

  function handleEmailNotificationChange(value) {
    setEmailNotification(value);
    // Call some function here to enable email notifications on device
  }

  // Sign out functionality
  const handleLogout = () => {
    console.log('SIGN OUT PRESSED')
  };

  // Sign in functionality
  const handleSignIn = () => {
    console.log('SIGN IN PRESSED')
  };

  // Sign in functionality
  const handleRegister = () => {
    console.log('REGISTER PRESSED')
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white}}>
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
                <Text style={styles.name}>{"{userObject.name}"}</Text>
                <Text style={styles.name}>{"{userObject.auth.level ? student : admin} profile"}</Text>
              </View>
            </View>

            <Text style={styles.rowTitle}>PREFERENCES</Text>

            {/* Setting items */}
            <View style={styles.rowContainer}>
              <TouchableOpacity style={styles.rowItemContainer}>
                <View style={styles.row}>
                  <Icon name="notifications-outline" size={35} color={colors.maroon} />
                  <Text style={styles.rowLabel}>Push Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    trackColor={{true: colors.maroon, false: colors.medium}}
                    onValueChange={(newValue) => {handlePushNotificationChange(newValue)}}
                    value={pushNotification} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rowItemContainer}>
                <View style={styles.row}>
                  <Icon name="mail-outline" size={35} color={colors.maroon} />
                  <Text style={styles.rowLabel}>Email Notifications</Text>
                  <View style={styles.rowSpacer} />
                  <Switch
                    trackColor={{true: colors.maroon, false: colors.medium}}
                    onValueChange={(newValue) => {handleEmailNotificationChange(newValue)}}
                    value={emailNotification} />
                </View>
              </TouchableOpacity>
              {/* Conditionally renders signout button if based on whether userObject exists */}
              {
                userObject ? (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                      <View style={styles.button}>
                        <Button
                          title="Sign Out"
                          onPress={handleLogout}
                          color={colors.white}
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
                )
              }
            </View>
          {/* </ScrollView> */}
        </View>
      </View>

      {/* Render NavBar */}
      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    backgroundColor: colors.white,
  },
  headerContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 24,
    backgroundColor: colors.white,
  },
  avatarWrapper: {
    position: 'relative',
  },
  headerTextContainer: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
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
    alignSelf: 'center',
    flex: 1,
    width: '90%',
    alignItems: 'center',
  },
  rowItemContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
    paddingHorizontal: 10,
    gap: 15,
  },
});

export default ProfileScreen;
