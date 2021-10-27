import React from "react";

import { StyleSheet } from "react-native";
import { Button, Surface, useTheme } from "react-native-paper";

export default function MyButton({
  onPress,
  text,
  style,
  disabled,
  contentStyle,
  labelStyle,
  icon
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
      color: myTheme.colors.green,
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
        theme={{
          roundness: "100%",
          colors: {
            primary: myTheme.colors.cream,
          },
        }}
      >
        {text}
      </Button>
    </Surface>
  );
}
