import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";

import { useTheme, IconButton } from "react-native-paper";

import Splash from "../screens/topStack/Splash";
import AuthStack from "./AuthStack";
import TermsOfUse from "../screens/topStack/TermsOfUse";
import TabStack from "./TabsNav";
import ValuesStack from "./ValuesStack";
import UpdatePasswordStack from "./UpdatePasswordStack";
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
        headerShown: false,
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
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="ValuesStack" component={ValuesStack} />
      <Stack.Screen name="UpdatePasswordStack" component={UpdatePasswordStack} />
      <Stack.Screen
        name="CompanyProfile"
        component={CompanyProfile}
        options={{ headerTransparent: true }}
      />
      <Stack.Screen
        name="NewProductForm"
        component={NewProductForm}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
