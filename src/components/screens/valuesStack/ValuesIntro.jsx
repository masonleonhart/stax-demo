import React from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";
import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function ValuesIntro({ navigation }) {
  const isFocused = useIsFocused();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "space-between",
    },
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    subheaderText: {
      marginTop: "5%",
      fontFamily: fonts.regular,
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
          Let’s figure out what are some things you love about the companies
          that you support
        </Text>
        <Text style={styles.subheaderText}>
          It takes just a couple minutes and allows us to help you discover new
          companies that you'll love
        </Text>
      </View>
      <MyButton
        text="Let's do it!"
        onPress={() => navigation.navigate("ValuesSelect")}
        style={styles.button}
      />
    </View>
  );
}
