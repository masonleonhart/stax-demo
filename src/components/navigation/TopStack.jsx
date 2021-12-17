import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { useTheme, IconButton } from "react-native-paper";

import Login from "../screens/topStack/Login";
import Landing from "../screens/topStack/Landing";
import ValuesStack from "./ValuesStack";
import BarcodeScanner from "../screens/topStack/BarcodeScanner";
import CompanyProfile from "../screens/topStack/CompanyProfile";
import NewProductForm from "../screens/topStack/NewProductForm";

export default function TopStack() {
  const Stack = createStackNavigator();
  const myTheme = useTheme();
  const companyDetails = useSelector((store) => store.barcode.barcodeDetails);

  // Renders the top stack navigator of the application

  return (
    <Stack.Navigator
      screenOptions={({ route, navigation }) => ({
        headerMode: "screen",
        gestureEnabled: true,
        headerTitle: "",
        cardStyle: {
          backgroundColor: "#f9f9fb",
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
      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: myTheme.colors.red,
          },
        }}
      />
      <Stack.Screen
        name="ValuesStack"
        component={ValuesStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      <Stack.Screen
        name="CompanyProfile"
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
      <Stack.Screen name="NewProductForm" component={NewProductForm} />
    </Stack.Navigator>
  );
}
