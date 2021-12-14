import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { useTheme, IconButton } from "react-native-paper";

import Login from "./TopStackNavigator/Login";
import Landing from "./TopStackNavigator/Landing";
import ValuesIntro from "./TopStackNavigator/ValuesIntro";
import Values from "./TopStackNavigator/Values";
import ValuesPairWiseMatching from "./TopStackNavigator/ValuesPairWiseMatching";
import ValuesComplete from "./TopStackNavigator/ValuesComplete";
import BarcodeScanner from "./TopStackNavigator/BarcodeScanner";
import CompanyProfile from "./TopStackNavigator/CompanyProfile";
import NewProductForm from "./TopStackNavigator/NewProductForm";

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
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ValuesIntro" component={ValuesIntro} />
      <Stack.Screen
        name="Values"
        component={Values}
        options={{ title: "Select Values to Compare" }}
      />
      <Stack.Screen
        name="ValuesPairWiseMatching"
        component={ValuesPairWiseMatching}
        options={{
          title: "Questionnaire",
          headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
        }}
      />
      <Stack.Screen name="ValuesComplete" component={ValuesComplete} />
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
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{ title: "Scan A Barcode" }}
      />
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
      <Stack.Screen
        name="NewProductForm"
        component={NewProductForm}
        options={{ title: "New Product Form" }}
      />
    </Stack.Navigator>
  );
}
