import React from "react";

import { StyleSheet } from "react-native";
import { Button, Surface, useTheme } from "react-native-paper";

export default function MyButton({ onPress, text, style }) {
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    buttonSurface: {
      backgroundColor: "transparent",
      padding: "1%",
      marginTop: "5%",
      marginBottom: "5%",
      ...style
    },
    buttonContent: { height: 50, alignItems: "center" },
    buttonLabel: { color: myTheme.colors.green },
  });

  return (
    <Surface style={styles.buttonSurface}>
      <Button
        mode="contained"
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
        onPress={onPress}
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
