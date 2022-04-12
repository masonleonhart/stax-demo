import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useTheme, IconButton } from "react-native-paper";

import BarcodeScanner from "../screens/ScannerStack/BarcodeScanner";
import CompanyProfile from "../screens/ScannerStack/CompanyProfile";

export default function ScannerStack({ ...props }) {
  const Stack = createStackNavigator();
  const myTheme = useTheme();

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
      <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      <Stack.Screen
        name="CompanyProfile"
        component={CompanyProfile}
        initialParams={{
          showBetterMatches: props.route.params.showBetterMatches ?? true,
        }}
      />
    </Stack.Navigator>
  );
}
