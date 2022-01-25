import React from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function TermsOfUse({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    text: {},
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={SharedStyles.container}>
      <Text style={styles.text}>Terms of Use go here</Text>
    </View>
  );
}
