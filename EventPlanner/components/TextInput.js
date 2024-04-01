import React from "react";
import { TextInput as RNTextInput } from "react-native";

import { View } from "./View";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { colors } from "../config";

export const TextInput = ({
  width = "100%",
  leftIconName,
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 8,
        flexDirection: "row",
        padding: 12,
        marginVertical: 12,
        width,
        borderWidth: 1,
        borderColor: colors.mediumGray,
      }}
    >
      {leftIconName ? (
        <Icon
          name={leftIconName}
          size={22}
          color={colors.mediumGray}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <RNTextInput
        style={{
          flex: 1,
          width: "100%",
          fontSize: 18,
          color: colors.black,
        }}
        placeholderTextColor={colors.medium}
        {...otherProps}
      />
      {rightIcon ? (
        <Button onPress={handlePasswordVisibility}>
          <Icon
            name={rightIcon}
            size={22}
            color={colors.mediumGray}
            style={{ marginRight: 10 }}
          />
        </Button>
      ) : null}
    </View>
  );
};
