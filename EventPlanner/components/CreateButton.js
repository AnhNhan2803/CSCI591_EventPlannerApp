import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";

const CreateButton = () => {
  const navigation = useNavigation();
  const iconSize = 50;

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateScreen")}
      >
        <Icon name="add-outline" size={iconSize} color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

export default CreateButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 10,
    position: "relative",
    backgroundColor: "#1d3c34",
    borderRadius: 70,
    alignSelf: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  },
});
