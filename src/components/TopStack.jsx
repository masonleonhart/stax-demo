import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { useTheme, IconButton } from "react-native-paper";

import Landing from "./TopStackNavigator/Landing";
import BarcodeScanner from "./TopStackNavigator/BarcodeScanner";
import CompanyProfile from "./TopStackNavigator/CompanyProfile";

export default function TopStack() {
  const Stack = createStackNavigator();
  const myTheme = useTheme();
  const companyDetails = useSelector((store) => store.barcodeDetails);

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
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Company Profile"
        component={CompanyProfile}
        options={{
          title: companyDetails.manufacturer
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
