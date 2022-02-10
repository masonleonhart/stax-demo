import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useTheme, IconButton } from "react-native-paper";

import VerifyPassword from "../screens/updatePasswordStack/VerifyPassword";
import ChangePassword from "../screens/updatePasswordStack/ChangePassword";

export default function UpdatePasswordStack() {
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
          backgroundColor: "#f9f9fb",
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
      <Stack.Screen name="VerifyPassword" component={VerifyPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}
