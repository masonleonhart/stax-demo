import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";

import { useTheme, IconButton } from "react-native-paper";

import Login from "../screens/topStack/Login";
import Landing from "../screens/topStack/Landing";
import ValuesStack from "./ValuesStack";
import BarcodeScanner from "../screens/topStack/BarcodeScanner";
import CompanyProfile from "../screens/topStack/CompanyProfile";
import NewProductForm from "../screens/topStack/NewProductForm";

export default function TopStack() {
  const Stack = createNativeStackNavigator();
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
          backgroundColor: myTheme.colors.lightGrey,
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
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="ValuesStack"
        component={ValuesStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BarcodeScanner"
        component={BarcodeScanner}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen
        name="CompanyProfile"
        component={CompanyProfile}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen name="NewProductForm" component={NewProductForm} />
    </Stack.Navigator>
  );
}
