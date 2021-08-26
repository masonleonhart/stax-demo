import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { IconButton, Text, useTheme } from "react-native-paper";

import Landing from "./TopStackNavigator.jsx/Landing";

export default function TopStack() {
  const Stack = createStackNavigator();
  const myTheme = useTheme();

  // Renders the top stack navigator of the application

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        gestureEnabled: true,
        cardStyle: {
          backgroundColor: myTheme.colors.cream,
        },
        headerStyle: {
          backgroundColor: myTheme.colors.cream,
          elevation: 1,
          shadowOpacity: 0.35,
          shadowRadius: 5,
          shadowColor: "black",
        },
      }}
    >
      <Stack.Screen name="Landing" component={Landing}></Stack.Screen>
    </Stack.Navigator>
  );
}
