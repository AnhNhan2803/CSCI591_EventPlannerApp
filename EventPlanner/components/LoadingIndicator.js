import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { colors } from "../config";
import { View } from "./View";

export const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.maroon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
