import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";

import { View, StyleSheet, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import DraggableFlatList from "react-native-draggable-flatlist";

import MyButton from "../../reusedComponents/MyButton";

import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import fonts from "../../reusedComponents/fonts";

export default function ValuesComplete({ route, navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userValues = useSelector((store) => store.user.values);
  const myTheme = useTheme();
  const [values, setValues] = useState(
    userValues.length !== 0 ? userValues : route.params
  );

  // Resets values stored in state and returns user to values select

  const onRetakePress = () => {
    dispatch({ type: "RESET_VALUES" });

    navigation.navigate("ValuesSelect");
  };

  // Sends the values to be stored into state and navigates to landing

  const onContinuePress = () => {
    dispatch({ type: "SET_VALUES", payload: values });

    navigation.navigate("Landing");
  };

  const styles = StyleSheet.create({
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 38,
      textAlign: "center",
    },
    subheaderText: {
      marginTop: "5%",
      marginBottom: "10%",
      fontSize: 20,
      textAlign: "center",
      fontFamily: fonts.regular,
    },
    valueContainer: {
      backgroundColor: "#e3e3e3",
      marginBottom: "5%",
      padding: "2.5%",
      borderRadius: 10,
    },
    valueText: {
      textAlign: "center",
      fontSize: 22,
      fontFamily: fonts.regular,
    },
    retakeButton: {
      borderTopColor: myTheme.colors.gray,
      borderTopWidth: 1,
      paddingTop: "10%",
      marginBottom: "0%",
    },
    RetakeLabel: {
      color: myTheme.colors.darkGray,
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView style={SharedStyles.container}>
      <Text style={styles.headerText}>
        {userValues.length !== 0 ? "Your Values" : "Congratulations!"}
      </Text>
      <Text style={styles.subheaderText}>
        Here are your values ranked. You can drag each item up or down if you
        are not satisfied with your ranking.
      </Text>

      {values.map((value) => (
        <View key={value.id} style={styles.valueContainer}>
          <Text style={styles.valueText}>{value.name}</Text>
        </View>
      ))}

      <MyButton
        text="Retake Quiz"
        style={styles.retakeButton}
        buttonColor="#e3e3e3"
        labelStyle={styles.RetakeLabel}
        onPress={onRetakePress}
      />

      <MyButton onPress={onContinuePress} text="Return to my Dashboard" />
    </ScrollView>
  );
}
