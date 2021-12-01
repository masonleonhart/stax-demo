import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch } from "react-redux";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { ScrollView, StyleSheet, View, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";

import SharedStyles from "../reusedComponents/SharedStyles";
import ValuesInstructionModal from "./ValuesInstructionModal";
import ValuesTooManyModal from "./ValuesTooManyModal";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function Values({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
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
      setValuesList(
        valuesList.filter((value) => value.id !== selectedValue.id)
      );
    }
  };

  // Takes the unselected value, adds it back to the list of values, removes it from the selected values list,
  // and sorts the original list of values by id

  const onSelectedDelete = (unselectedValue) => {
    valuesList.splice(unselectedValue.id, 0, unselectedValue);

    setSelectedValues(
      selectedValues.filter((value) => value.id !== unselectedValue.id)
    );

    setValuesList(valuesList.sort((a, b) => (a.id > b.id ? 1 : -1)));
  };

  // stores the selected values in redux store and navigates to the landing page

  const onSubmitPress = () => {
    dispatch({ type: "SET_VALUES", payload: selectedValues });

    navigation.navigate("ValuesPairWiseMatching", selectedValues);
  };

  const SelectedValue = ({ id, icon, name }) => {
    return (
      <View style={styles.selectedValue}>
        <MaterialCommunityIcons
          name={icon}
          size={30}
        />
        <Text style={styles.selectedValueText}>{name}</Text>
        <Pressable onPress={() => onSelectedDelete({ id, icon, name })}>
          <MaterialCommunityIcons
            name="close"
            size={30}
          />
        </Pressable>
      </View>
    );
  };

  const renderSelected1 = () => {
    if (selectedValues[0]) {
      return (
        <SelectedValue
          id={selectedValues[0].id}
          icon={selectedValues[0].icon}
          name={selectedValues[0].name}
        />
      );
    }
  };

  const renderSelected2 = () => {
    if (selectedValues[1]) {
      return (
        <SelectedValue
          id={selectedValues[1].id}
          icon={selectedValues[1].icon}
          name={selectedValues[1].name}
        />
      );
    }
  };

  const renderSelected3 = () => {
    if (selectedValues[2]) {
      return (
        <SelectedValue
          id={selectedValues[2].id}
          icon={selectedValues[2].icon}
          name={selectedValues[2].name}
        />
      );
    }
  };

  const renderSelected4 = () => {
    if (selectedValues[3]) {
      return (
        <SelectedValue
          id={selectedValues[3].id}
          icon={selectedValues[3].icon}
          name={selectedValues[3].name}
        />
      );
    }
  };

  const renderSelected5 = () => {
    if (selectedValues[4]) {
      return (
        <SelectedValue
          id={selectedValues[4].id}
          icon={selectedValues[4].icon}
          name={selectedValues[4].name}
        />
      );
    }
  };

  const styles = StyleSheet.create({
    selectedList: {
      marginBottom: "10%",
    },
    selectedWrapper: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "5%",
    },
    selectedNumberText: {
      fontSize: 26,
      fontWeight: "600",
    },
    selectedValue: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: "5%",
      flex: 1,
    },
    selectedValueText: {
      fontSize: 20,
      fontWeight: "600",
    },
    valueButton: {
      marginBottom: "0%",
    },
    continueButton: {
      borderTopColor: myTheme.colors.gray,
      borderTopWidth: 1,
      paddingTop: "10%",
      marginTop: "10%",
    },
    continueButtonLabel: {
      color: myTheme.colors.cream,
      fontWeight: "bold",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView style={SharedStyles.container}>
      <ValuesInstructionModal
        isInstructionDialogVisible={isInstructionDialogVisible}
        setIsInstructionDialogVisible={setIsInstructionDialogVisible}
      />

      <ValuesTooManyModal
        isTooManyDialogVisible={isTooManyDialogVisible}
        setIsTooManyDialogVisible={setIsTooManyDialogVisible}
      />

      <View style={styles.selectedList}>
        <View style={styles.selectedWrapper}>
          <Text style={styles.selectedNumberText}>1.</Text>
          {renderSelected1()}
        </View>
        <View style={styles.selectedWrapper}>
          <Text style={styles.selectedNumberText}>2.</Text>
          {renderSelected2()}
        </View>
        <View style={styles.selectedWrapper}>
          <Text style={styles.selectedNumberText}>3.</Text>
          {renderSelected3()}
        </View>
        <View style={styles.selectedWrapper}>
          <Text style={styles.selectedNumberText}>4.</Text>
          {renderSelected4()}
        </View>
        <View style={styles.selectedWrapper}>
          <Text style={styles.selectedNumberText}>5.</Text>
          {renderSelected5()}
        </View>
      </View>

      {valuesList.map((value) => (
        <MyButton
          key={value.id}
          style={styles.valueButton}
          icon={value.icon}
          text={value.name}
          onPress={() => onValuePress(value)}
        />
      ))}

      <MyButton
        style={styles.continueButton}
        text="Submit"
        disabled={selectedValues.length !== 5}
        labelStyle={styles.continueButtonLabel}
        onPress={onSubmitPress}
      />
    </ScrollView>
  );
}
