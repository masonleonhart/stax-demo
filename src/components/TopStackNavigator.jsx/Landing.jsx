import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { Text, useTheme } from "react-native-paper";

import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function Landing() {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <Text>Hello</Text>
  );
}
