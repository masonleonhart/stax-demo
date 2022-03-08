import React from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";

import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function UpdateUserInfoLanding({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  const navLocations = [
    { key: 1, title: "Update your password", screen: "ChangePassword" },
    { key: 2, title: "Update your Name", screen: "ChangeName" },
  ];

  const NavPressable = ({ text, navLocation }) => (
    <Pressable
      style={styles.pressable}
      onPress={() => navigation.navigate(navLocation)}
    >
      <Text style={styles.pressableText}>{text}</Text>
    </Pressable>
  );

  const styles = StyleSheet.create({
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    pressable: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      padding: "5%",
    },
    pressableText: {
      fontFamily: fonts.regular,
      fontSize: 20,
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={[SharedStyles.container]}>
      <Text style={styles.headerText}>Update User Info</Text>

      {navLocations.map((navObj) => (
        <NavPressable
          key={navObj.key}
          text={navObj.title}
          navLocation={navObj.screen}
        />
      ))}
    </View>
  );
}
