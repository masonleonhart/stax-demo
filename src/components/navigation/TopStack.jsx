import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useSelector } from "react-redux";

import { useTheme, IconButton } from "react-native-paper";

import Splash from "../screens/topStack/Splash";
import TabStack from "./TabsNav";
import ValuesStack from "./ValuesStack";

export default function TopStack() {
  const Stack = createStackNavigator();
  const myTheme = useTheme();
  const companyDetails = useSelector((store) => store.barcode.barcodeDetails);

  // Renders the top stack navigator of the application

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerMode: "screen",
        headerShown: false,
        gestureEnabled: true,
        headerTitle: "",
        cardStyle: {
          backgroundColor: "white",
        },
        headerLeft: () => {
          // constantly render the back button but go into landing page and specifically not render it from there

          if (route.name !== "Landing") {
            return (
              <IconButton
                icon="chevron-left"
                size={30}
                color={
                  route.name === "BarcodeScanner"
                    ? "white"
                    : myTheme.colors.grey
                }
                onPress={() => navigation.goBack()}
              />
            );
          } else if (route.name === "Landing") {
            return <></>;
          }
        },
      })}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="ValuesStack" component={ValuesStack} />
    </Stack.Navigator>
  );
}
