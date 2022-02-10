import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { useTheme } from "react-native-paper";

import Landing from "../screens/Tabs/Landing";
import BarcodeScanner from "../screens/Tabs/BarcodeScanner";
import Account from "../screens/Tabs/Account";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  const myTheme = useTheme();

  const Discover = () => {
    return <></>;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        tabBarShowLabel: false,
        tabBarActiveTintColor: myTheme.colors.blue,
        tabBarInactiveTintColor: myTheme.colors.lightgrey
      }}
    >
      <Tab.Screen
        name="Landing"
        component={Landing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-variant-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={BarcodeScanner}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="magnify"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
