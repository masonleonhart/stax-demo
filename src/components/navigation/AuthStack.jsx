import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useTheme } from "react-native-paper";

import Login from "../screens/authStack/Login";
import Register from "../screens/authStack/Register";

export default function AuthStack() {
  const Stack = createStackNavigator();
  const myTheme = useTheme();

  // Renders the values stack for the application

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        cardStyle: {
          backgroundColor: myTheme.colors.cream,
        },
      })}
    >
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
}
