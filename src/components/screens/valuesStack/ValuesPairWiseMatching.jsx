import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";

import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  ImageBackground,
} from "react-native";
import { Text, ProgressBar, useTheme } from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";

import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import image from "../../../../assets/placeholder.png";

export default function ValuesPairWiseMatching({ route, navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const [values, setValues] = useState(route.params);
  const [valuesIndex, setValuesIndex] = useState(0);
  const [savedIndex, setSavedIndex] = useState(0);

  // Checks if the item index is the same as saved index, if it is then move to the next array position normally
  // if it's not (moving something up in ranking or to a lower index) return the current item index to the saved index position

  const moveToNextArrayIndex = () => {
    let currentValuesIndex = valuesIndex;

    if (valuesIndex === savedIndex) {
      currentValuesIndex++;

      if (currentValuesIndex === 4) {
        navigation.navigate("ValuesComplete", values);
      } else {
        setValuesIndex(currentValuesIndex);
        setSavedIndex(currentValuesIndex);
      }
    } else {
      setValuesIndex(savedIndex);
    }
  };

  // Moves the item index down and increments the saved index by 1 if the values index and the saved index equal each other
  // so when you return to the saved spot you aren't comparing two items that you have compared before

  const moveToPreviousArrayIndex = () => {
    let currentValuesIndex = valuesIndex;

    if (valuesIndex === savedIndex) {
      setSavedIndex(currentValuesIndex + 1);
    }

    currentValuesIndex--;

    setValuesIndex(currentValuesIndex);
  };

  // Takes the item at 1 past the index we are checking and removes it from the list, then adds it back in the position
  // of the item that we are checking so it is of higher rank or at a lower index

  const moveArrayIndexLeft = (valueToMove) => {
    let arrayToChange = [...values];

    arrayToChange.splice(valuesIndex + 1, 1);

    arrayToChange.splice(valuesIndex, 0, valueToMove);

    setValues(arrayToChange);
  };

  // Calls the function to change order of array index with the item 1 past that we are checking so it can be moved
  // up in ranking or into a lower index and checks if the saved index is 4 and if the current index is at the start of the array,
  // if it is then conitnue to the next screen else checks to see if just the current index is the start of the array, if it is then
  // move on to the next index to check, otherwise move to the previous index position so we can compare the item that was just
  // moved to the item that is now in front of it in ranking or at a lower index

  const onBottomButtonClick = () => {
    moveArrayIndexLeft(values[valuesIndex + 1]);

    if (valuesIndex === 0 && savedIndex === 4) {
      navigation.navigate("Login");
    } else if (valuesIndex === 0) {
      moveToNextArrayIndex();
    } else {
      moveToPreviousArrayIndex();
    }
  };

  const onSubmitPress = () => {
    console.log(values);
  };

  const styles = StyleSheet.create({
    appreciateText: {
      marginTop: "10%",
      fontSize: 20,
      fontWeight: "bold",
    },
    pressable: {
      height: "40%",
      marginVertical: "10%",
      borderRadius: 10,
      overflow: "hidden",
    },
    imageBackground: {
      flex: 1,
    },
    scrim: {
      flex: 1,
      padding: "5%",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, .2)",
    },
    valueNameText: {
      fontWeight: "bold",
      color: "white",
      fontSize: 30,
      marginBottom: "5%",
    },
    valueDescriptionText: {
      fontSize: 28,
      color: "white",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView style={SharedStyles.container}>
      {valuesIndex < 4 ? (
        <>
          <Text style={styles.appreciateText}>I appreciate companies with</Text>
          <Pressable style={styles.pressable} onPress={moveToNextArrayIndex}>
            <ImageBackground source={image} style={styles.imageBackground}>
              <View style={styles.scrim}>
                <Text style={styles.valueNameText}>
                  {values[valuesIndex].name}
                </Text>
                <Text style={styles.valueDescriptionText}>
                  This is a description. Such a good description.
                </Text>
              </View>
            </ImageBackground>
          </Pressable>

          <ProgressBar
            color={myTheme.colors.red}
            progress={(savedIndex + 1) / values.length}
          />

          <Pressable style={styles.pressable} onPress={onBottomButtonClick}>
            <ImageBackground source={image} style={styles.imageBackground}>
              <View style={styles.scrim}>
                <Text style={styles.valueNameText}>
                  {values[valuesIndex + 1].name}
                </Text>
                <Text style={styles.valueDescriptionText}>
                  This is a description. Such a good description.
                </Text>
              </View>
            </ImageBackground>
          </Pressable>
        </>
      ) : (
        <MyButton text="submit" onPress={onSubmitPress} />
      )}
    </ScrollView>
  );
}
