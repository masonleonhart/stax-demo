import React from "react";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import DraggableFlatList from "react-native-draggable-flatlist";

import MyButton from "../../reusedComponents/MyButton";

import EmptyStateView from "../../reusedComponents/EmptyStateView";
import fonts from "../../reusedComponents/fonts";

export default function ValuesComplete({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const quizSelection = useSelector((store) => store.user.valuesQuizSelection);
  const myTheme = useTheme();

  // returns user to values select

  const onRetakePress = () => {
    navigation.navigate("ValuesSelect");
  };

  // Sends the values to be stored into state and navigates to landing

  const onContinuePress = () => {
    dispatch({ type: "SET_USER_VALUES", payload: quizSelection })
  };

  const styles = StyleSheet.create({
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 38,
      color: myTheme.colors.grey,
    },
    subheaderText: {
      marginTop: "5%",
      marginBottom: "10%",
      fontSize: 20,
      fontFamily: fonts.regular,
      color: myTheme.colors.grey,
    },
    scrollView: {
      marginHorizontal: "5%",
    },
    valueContainer: {
      marginBottom: "5%",
      padding: "2.5%",
      paddingHorizontal: "5%",
      borderRadius: 10,
      borderColor: myTheme.colors.grey,
      borderWidth: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    valueText: {
      fontSize: 20,
      fontFamily: fonts.regular,
      color: myTheme.colors.grey,
      marginLeft: "5%",
    },
    retakeText: {
      textAlign: "center",
      textDecorationLine: "underline",
      fontFamily: fonts.bold,
      color: myTheme.colors.blue,
    },
  });
  const renderItem = ({ item, drag, isActive }) => (
    <Pressable
      onLongPress={drag}
      disabled={isActive}
      style={[
        styles.valueContainer,
        {
          backgroundColor: isActive ? "#f0f0f0" : "#e3e3e3",
          borderColor: isActive ? myTheme.colors.grey : "#e3e3e3",
        },
      ]}
    >
      <MaterialCommunityIcons
        name={item.icon_name}
        color={myTheme.colors.blue}
        size={30}
      />
      <Text style={styles.valueText}>{item.name}</Text>
    </Pressable>
  );

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={styles.scrollView}>
      <Text style={styles.headerText}>Your Results</Text>
      <Text style={styles.subheaderText}>
        Here are your values, starting with your highest result! To reorder,
        simply hold and then drag the value up or down.
      </Text>

      <DraggableFlatList
        scrollEnabled={false}
        data={quizSelection}
        onDragEnd={({ data }) =>
          dispatch({ type: "SET_QUIZ_SELECTION", payload: data })
        }
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />

      <MyButton onPress={() => navigation.navigate("TabStack", { screen: "Landing" })} text="Go to my Dashboard" />

      <Pressable onPress={onRetakePress}>
        <Text style={styles.retakeText}>Retake Quiz</Text>
      </Pressable>
    </View>
  );
}
