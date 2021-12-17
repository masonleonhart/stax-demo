import React from "react";

import { StyleSheet } from "react-native";
import { Button, Surface, useTheme } from "react-native-paper";

import fonts from "./fonts"

export default function MyButton({
  onPress,
  text,
  style,
  disabled,
  contentStyle,
  labelStyle,
  icon,
  buttonColor
}) {
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    buttonSurface: {
      backgroundColor: "transparent",
      padding: "1%",
      marginTop: "5%",
      marginBottom: "5%",
      ...style,
    },
    buttonContent: {
      height: 50,
      alignItems: "center",
      ...contentStyle,
    },
    buttonLabel: {
      color: "white",
      fontFamily: fonts.bold,
      ...labelStyle,
    },
  });

  return (
    <Surface style={styles.buttonSurface}>
      <Button
        mode="contained"
        disabled={disabled ? true : false}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        onPress={onPress}
        icon={icon}
        uppercase={false}
        theme={{
          roundness: 10,
          colors: {
            primary: buttonColor ? buttonColor : myTheme.colors.red,
          },
        }}
      >
        {text}
      </Button>
    </Surface>
  );
}
