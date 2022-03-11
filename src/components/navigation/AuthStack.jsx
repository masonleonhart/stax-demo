import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useTheme, IconButton } from "react-native-paper";

import Login from "../screens/authStack/Login";
import Register from "../screens/authStack/Register";
import ResetPassword from "../screens/authStack/ResetPassword";

export default function AuthStack() {
  const Stack = createStackNavigator();
  const myTheme = useTheme();

  // Renders the values stack for the application

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerMode: "screen",
        gestureEnabled: true,
        headerTitle: "",
        cardStyle: {
          backgroundColor: "white",
        },
        headerLeft: () => (
          <IconButton
            icon="chevron-left"
            size={30}
            color={myTheme.colors.darkGrey}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
