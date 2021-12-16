import React from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";
import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function ValuesIntro({ navigation }) {
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "space-between",
    },
    headerText: {
      marginVertical: "5%",
      fontWeight: "bold",
      fontSize: 24,
    },
    subheaderText: {
      marginTop: "5%",
      fontSize: 20,
    },
    button: {
      marginBottom: "50%",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={[SharedStyles.container, styles.container]}>
      <View>
        <Text style={styles.headerText}>
          Next, let’s figure out what are some things you love about companies
          you support
        </Text>
        <Text style={styles.subheaderText}>
          It takes just a couple minutes and allows us to help you discover new
          companies that you'll love
        </Text>
      </View>
      <MyButton
        text="Let's do it!"
        onPress={() => navigation.navigate("Values")}
        style={styles.button}
      />
    </View>
  );
}
