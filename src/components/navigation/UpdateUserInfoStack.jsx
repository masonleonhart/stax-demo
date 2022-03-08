import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useTheme, IconButton } from "react-native-paper";

import VerifyPassword from "../screens/updateUserInfoStack/VerifyPassword";
import UpdateUserInfoLanding from "../screens/updateUserInfoStack/UpdateUserInfoLanding";
import ChangePassword from "../screens/updateUserInfoStack/ChangePassword";
import ChangeName from "../screens/updateUserInfoStack/ChangeName";

export default function UpdateUserInfoStack() {
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
      <Stack.Screen name="VerifyPassword" component={VerifyPassword} />
      <Stack.Screen name="UpdateUserInfoLanding" component={UpdateUserInfoLanding} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeName" component={ChangeName} />
    </Stack.Navigator>
  );
}
