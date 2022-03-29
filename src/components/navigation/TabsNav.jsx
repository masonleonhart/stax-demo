import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import { useTheme } from "react-native-paper";

import Landing from "../screens/Tabs/Landing";
import ScannerStack from "./ScannerStack";
import Account from "../screens/Tabs/Account";
import Discover from "../screens/Tabs/Discover";
import { Pressable } from "react-native";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  const myTheme = useTheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenOptions={{
        headerTransparent: true,
        headerTitle: "",
        tabBarShowLabel: false,
        tabBarActiveTintColor: myTheme.colors.blue,
        tabBarInactiveTintColor: myTheme.colors.lightgrey,
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
        name="ScannerStack"
        component={ScannerStack}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="barcode-scan"
              color={color}
              size={size}
            />
          ),
          tabBarButton: (props) => (
            <Pressable
              {...props}
              onPress={() =>
                navigation.navigate("ScannerStack", {
                  screen: "BarcodeScanner",
                })
              }
            />
          ),
        })}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
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
