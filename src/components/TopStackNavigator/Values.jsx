import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";

import SharedStyles from "../reusedComponents/SharedStyles";
import ValuesInstructionModal from "./ValuesInstructionModal";
import ValuesTooManyModal from "./ValuesTooManyModal";
import EmptyStateView from "../reusedComponents/EmptyStateView";
import image from "../../../assets/placeholder.png";

export default function Values({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const [isInstructionDialogVisible, setIsInstructionDialogVisible] =
    useState(true);
  const [isTooManyDialogVisible, setIsTooManyDialogVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [valuesList, setValuesList] = useState([
    {
      id: 1,
      name: "Low Carbon Footprint",
      icon: "leaf",
    },
    {
      id: 2,
      name: "Efficient Water Use",
      icon: "leaf",
    },
    {
      id: 3,
      name: "Reduced Waste",
      icon: "leaf",
    },
    {
      id: 4,
      name: "Parental Leave Benefits",
      icon: "briefcase",
    },
    {
      id: 5,
      name: "Living Wages",
      icon: "briefcase",
    },
    {
      id: 6,
      name: "Care for Workers",
      icon: "briefcase",
    },
    {
      id: 7,
      name: "Charitable Giving",
      icon: "account-group",
    },
    {
      id: 8,
      name: "Respect to Human Rights",
      icon: "account-group",
    },
    {
      id: 9,
      name: "Diverse Leadership",
      icon: "bank",
    },
    {
      id: 10,
      name: "Pay Equality",
      icon: "bank",
    },
  ]);

  // checks if the selected list is full, if it is, set the too many modal to true so no more can be added and
  // alert the user, else, takes the selected value and removes it from the list of buttons, then adds it to the selected list

  const onValuePress = (selectedValue) => {
    if (selectedValues.length === 5) {
      setIsTooManyDialogVisible(true);
    } else {
      setSelectedValues([...selectedValues, selectedValue]);
    }
  };

  // stores the selected values in redux store and navigates to the landing page

  const onSubmitPress = () => {
    navigation.navigate("ValuesPairWiseMatching", selectedValues);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerText: {
      marginVertical: "5%",
      fontWeight: "bold",
      fontSize: 24,
      marginHorizontal: "5%",
    },
    subheaderText: {
      marginVertical: "5%",
      fontSize: 20,
      marginHorizontal: "5%",
    },
    valuesListWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    valueCard: {
      margin: "5%",
      width: "40%",
      borderRadius: 10,
      overflow: "hidden",
    },
    imageBackground: {
      flex: 1,
    },
    scrim: {
      flex: 1,
      padding: "5%",
      backgroundColor: "rgba(0, 0, 0, .2)",
    },
    valueCardName: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      marginBottom: "20%",
    },
    valueCardDescription: {
      fontSize: 18,
      color: "white",
    },
    continueButton: {
      borderTopColor: myTheme.colors.gray,
      borderTopWidth: 1,
      paddingTop: "10%",
      marginTop: "10%",
      marginHorizontal: "5%",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView style={styles.container}>
      <ValuesInstructionModal
        isInstructionDialogVisible={isInstructionDialogVisible}
        setIsInstructionDialogVisible={setIsInstructionDialogVisible}
      />

      <ValuesTooManyModal
        isTooManyDialogVisible={isTooManyDialogVisible}
        setIsTooManyDialogVisible={setIsTooManyDialogVisible}
      />

      <Text style={styles.headerText}>
        First, select 5 company values that are most meaningful to you
      </Text>
      <Text style={styles.subheaderText}>
        You will always be able to take this quiz again
      </Text>

      <View style={styles.valuesListWrapper}>
        {valuesList.map((value) => (
          <Pressable
            style={styles.valueCard}
            key={value.id}
            onPress={() => onValuePress(value)}
          >
            <ImageBackground source={image} style={styles.imageBackground}>
              <View style={styles.scrim}>
                <Text style={styles.valueCardName}>{value.name}</Text>
                <Text style={styles.valueCardDescription}>
                  This is a description. Such a good description.
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        ))}
      </View>

      <MyButton
        style={styles.continueButton}
        text={`${selectedValues.length} / 5 selected`}
        disabled={selectedValues.length !== 5}
        onPress={onSubmitPress}
      />
    </ScrollView>
  );
}
