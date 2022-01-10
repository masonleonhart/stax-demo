import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useSelector } from "react-redux";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";

import fonts from "../../reusedComponents/fonts";
import SharedStyles from "../../reusedComponents/SharedStyles";
import ValuesTooManyModal from "../../modals/ValuesTooManyModal";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function Values({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const [isTooManyDialogVisible, setIsTooManyDialogVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const valuesList = useSelector((store) => store.valuesList);

  // chekcs if the clicked value appears in the selected list, if it does then remove the value, else checks if the selected list is full,
  // if it is, set the too many modal to true so no more can be added and alert the user, else, takes the selected value and
  // removes it from the list of buttons, then adds it to the selected list

  const onValuePress = (clickedValue) => {
    if (checkIfSelectd(clickedValue.name)) {
      setSelectedValues(
        selectedValues.filter((value) => value.id !== clickedValue.id)
      );
    } else if (selectedValues.length === 5) {
      setIsTooManyDialogVisible(true);
    } else {
      setSelectedValues([...selectedValues, clickedValue]);
    }
  };

  // Checks if the selected value is in the selected list of values to show a check or not

  const checkIfSelectd = (valueToCheck) => {
    for (const value of selectedValues) {
      if (valueToCheck === value.name) {
        return true;
      }
    }
  };

  // stores the selected values in redux store and navigates to the landing page

  const onSubmitPress = () => {
    navigation.navigate("ValuesBreak", selectedValues);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
      marginHorizontal: "5%",
    },
    subheaderText: {
      marginVertical: "5%",
      fontSize: 20,
      marginHorizontal: "5%",
      fontFamily: fonts.regular,
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
      justifyContent: "space-between",
    },
    valueNameWrapper: {
      flexWrap: "wrap",
      marginBottom: "5%",
    },
    valueCardName: {
      fontSize: 20,
      fontFamily: fonts.bold,
      width: "80%",
    },
    valueCardDescription: {
      fontSize: 16,
      fontFamily: fonts.bold,
    },
    continueButton: {
      borderTopColor: myTheme.colors.grey,
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
            <ImageBackground
              source={{ uri: value.image_url }}
              style={styles.imageBackground}
            >
              <View style={[styles.scrim, { backgroundColor: value.scrim }]}>
                <View style={[SharedStyles.flexRow, styles.valueNameWrapper]}>
                  <Text
                    style={[styles.valueCardName, { color: value.text_color }]}
                  >
                    {value.name}
                  </Text>
                  {checkIfSelectd(value.name) && (
                    <MaterialCommunityIcons
                      name="check-circle-outline"
                      color={value.text_color}
                      size={25}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.valueCardDescription,
                    { color: value.text_color },
                  ]}
                >
                  {value.description}
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        ))}
      </View>

      <MyButton
        style={styles.continueButton}
        text={`${selectedValues.length} / 5 Selected`}
        disabled={selectedValues.length !== 5}
        onPress={onSubmitPress}
      />
    </ScrollView>
  );
}
