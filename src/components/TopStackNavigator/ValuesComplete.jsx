import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";

import DraggableFlatList from "react-native-draggable-flatlist";
import MyButton from "../reusedComponents/MyButton";
import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function ValuesComplete({ route, navigation }) {
  const isFocused = useIsFocused();
  const [values, setValues] = useState(route.params);

  const styles = StyleSheet.create({
    headerText: {
      marginVertical: "5%",
      fontWeight: "bold",
      fontSize: 40,
      textAlign: "center",
    },
    subheaderText: {
      marginTop: "5%",
      marginBottom: "10%",
      fontSize: 20,
      textAlign: "center",
    },
    valueContainer: {
      backgroundColor: "#e3e3e3",
      marginBottom: "5%",
      padding: "2.5%",
      borderRadius: 10,
    },
    valueText: {
      textAlign: "center",
      fontSize: 24,
    },
    button: {
      marginTop: "10%",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView style={SharedStyles.container}>
      <Text style={styles.headerText}>Congratulations!</Text>
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
        style={styles.button}
        onPress={() => navigation.navigate("ValuesIntro")}
        text="continue to my dashboard"
      />
    </ScrollView>
  );
}
