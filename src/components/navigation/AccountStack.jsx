import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Account from "../screens/AccountStack/Account";
import LikedBrands from "../screens/AccountStack/LikedBrands";

export default function AccountStack() {
  const Stack = createStackNavigator();

  // Renders the values stack for the application

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        cardStyle: {
          backgroundColor: "white",
        },
      })}
    >
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="LikedBrands" component={LikedBrands} />
    </Stack.Navigator>
  );
}
