import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";

import MyButton from "../reusedComponents/MyButton";

import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function Landing({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center"
    },
    text: {
      marginBottom: "30%",
      fontSize: 18,
      lineHeight: 27,
      textAlign: "center"
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={[SharedStyles.container, styles.container]}>
      <Text style={styles.text}>
        Welcome to the Stax Barcode Scanner! Use this application to scan any
        product to see how it will align to your personal values
      </Text>
      <MyButton
        text="Get Started"
        onPress={() => navigation.navigate("BarcodeScanner")}
      />
    </View>
  );
}
