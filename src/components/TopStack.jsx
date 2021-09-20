import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { useTheme, IconButton } from "react-native-paper";

import Login from "./TopStackNavigator/Login";
import Landing from "./TopStackNavigator/Landing";
import BarcodeScanner from "./TopStackNavigator/BarcodeScanner";
import CompanyProfile from "./TopStackNavigator/CompanyProfile";

export default function TopStack() {
  const Stack = createStackNavigator();
  const myTheme = useTheme();
  const companyDetails = useSelector((store) => store.barcode.barcodeDetails);
  const scanError = useSelector((store) => store.barcode.scanError);

  // Renders the top stack navigator of the application

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
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
        headerTitleStyle: {
          color: myTheme.colors.green,
        },
        headerLeft: () => {
          if (route.name !== "Landing") {
            return (
              <IconButton
                icon="chevron-left"
                size={30}
                color={myTheme.colors.green}
                onPress={() => navigation.goBack()}
              />
            );
          }
        },
      })}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ title: "STAX Scan Beta" }}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{ title: "Scan A Barcode" }}
      />
      <Stack.Screen
        name="CompanyProfile"
        component={CompanyProfile}
        options={{
          title: scanError
            ? "New Product Form"
            : companyDetails.manufacturer
            ? companyDetails.manufacturer
            : companyDetails.brand
            ? companyDetails.brand
            : companyDetails.title
            ? companyDetails.title
            : "Company Profile",
        }}
      />
    </Stack.Navigator>
  );
}
