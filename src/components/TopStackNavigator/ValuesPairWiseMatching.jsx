import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";

import SharedStyles from "../reusedComponents/SharedStyles";

export default function ValuesPairWiseMatching() {
  const isFocused = useIsFocused();

  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4]);
  const [numbersIndex, setNumbersIndex] = useState(0);
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
    let currentNumbersIndex = numbersIndex;

    if (numbersIndex === savedIndex) {
      currentNumbersIndex++;

      setNumbersIndex(currentNumbersIndex);
      setSavedIndex(currentNumbersIndex);
    } else {
      setNumbersIndex(savedIndex);
    }
  };

  // Moves the item index down

  const moveToPreviousArrayIndex = () => {
    let currentNumbersIndex = numbersIndex;

    currentNumbersIndex--;

    setNumbersIndex(currentNumbersIndex);
  };

  // Takes the item at 1 past the index we are checking and removes it from the list, then adds it back in the position
  // of the item that we are checking so it is of higher rank or at a lower index

  const moveArrayIndexLeft = (numberToMove) => {
    let arrayToChange = [...numbers];

    arrayToChange.splice(numbersIndex + 1, 1);

    arrayToChange.splice(numbersIndex, 0, numberToMove);

    setNumbers(arrayToChange);
  };

  // Calls the function to change order of array index with the item 1 past that we are checking so it can be moved
  // up in ranking or into a lower index and checks to see if the current index is the start of the array, if it is then
  // move on to the next index to check, otherwise move to the previous index position so we can compare the item that was just
  // moved to the item that is now in front of it in ranking or at a lower index

  const onBottomButtonClick = () => {
    moveArrayIndexLeft(numbers[numbersIndex + 1]);

    if (numbersIndex === 0) {
      moveToNextArrayIndex();
    } else {
      moveToPreviousArrayIndex();
    }
  };

  const stlyes = StyleSheet.create({
    numbersArray: {
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
      <Text style={stlyes.numbersArray}>{numbers}</Text>

      {numbersIndex !== 4 && (
        <Text style={stlyes.numbersArray}>
          Current array index: {numbersIndex}
        </Text>
      )}
      {numbersIndex !== 4 ? (
        <>
          <MyButton
            text="randomize array"
            style={stlyes.randomizeButton}
            onPress={() => setNumbers(shuffle([...numbers]))}
          />
          <MyButton text={numbers[numbersIndex]} onPress={moveToNextArrayIndex} />
          <MyButton
            text={numbers[numbersIndex + 1]}
            onPress={onBottomButtonClick}
          />
        </>
      ) : (
        <Text style={stlyes.numbersArray}>Complete!</Text>
      )}
    </View>
  );
}
