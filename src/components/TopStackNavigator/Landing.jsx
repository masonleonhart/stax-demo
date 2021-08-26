import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { Text, useTheme, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function Landing({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={[SharedStyles.container, styles.container]}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("BarcodeScanner")}
      >
        Get Started
      </Button>
    </View>
  );
}
