import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";

import SharedStyles from "../reusedComponents/SharedStyles";

export default function ValuesPairWiseMatching() {
  const isFocused = useIsFocused();

  const [values, setValues] = useState([0, 1, 2, 3, 4]);
  const [valuesIndex, setValuesIndex] = useState(0);
  const [savedIndex, setSavedIndex] = useState(0);

  // Fisher-Yates Shuffle function

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // Checks if the item index is the same as saved index, if it is then move to the next array position normally
  // if it's not (moving something up in ranking or to a lower index) return the current item index to the saved index position

  const moveToNextArrayIndex = () => {
    let currentValuesIndex = valuesIndex;

    if (valuesIndex === savedIndex) {
      currentValuesIndex++;

      setValuesIndex(currentValuesIndex);
      setSavedIndex(currentValuesIndex);
    } else {
      setValuesIndex(savedIndex);
    }
  };

  // Moves the item index down and increments the saved index by 1 so when you return to the saved spot you aren't comparing two
  // items that you have compared before

  const moveToPreviousArrayIndex = () => {
    let currentValuesIndex = valuesIndex;

    if (valuesIndex === savedIndex) {
      setSavedIndex(currentValuesIndex + 1)
    };

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
  // up in ranking or into a lower index and checks to see if the current index is the start of the array, if it is then
  // move on to the next index to check, otherwise move to the previous index position so we can compare the item that was just
  // moved to the item that is now in front of it in ranking or at a lower index

  const onBottomButtonClick = () => {
    moveArrayIndexLeft(values[valuesIndex + 1]);

    if (valuesIndex === 0) {
      moveToNextArrayIndex();
    } else {
      moveToPreviousArrayIndex();
    }
  };

  const stlyes = StyleSheet.create({
    valuesArray: {
      textAlign: "center",
      fontSize: 26,
      marginTop: "5%",
    },
    randomizeButton: {
      marginBottom: "15%",
    },
  });

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={SharedStyles.container}>
      <Text style={stlyes.valuesArray}>{values}</Text>

      {valuesIndex !== 4 && (
        <>
          <Text style={stlyes.valuesArray}>
            Current array index: {valuesIndex}
          </Text>
          <Text style={stlyes.valuesArray}>
            Current saved index: {savedIndex}
          </Text>
        </>
      )}
      {valuesIndex !== 4 ? (
        <>
          <MyButton
            text="randomize array"
            style={stlyes.randomizeButton}
            onPress={() => setValues(shuffle([...values]))}
          />
          <MyButton
            text={values[valuesIndex]}
            onPress={moveToNextArrayIndex}
          />
          <MyButton
            text={values[valuesIndex + 1]}
            onPress={onBottomButtonClick}
          />
        </>
      ) : (
        <Text style={stlyes.valuesArray}>Complete!</Text>
      )}
    </View>
  );
}
