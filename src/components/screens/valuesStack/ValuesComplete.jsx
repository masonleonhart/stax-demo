import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER_ADDRESS, AUTH_HEADER } from "@env";

import { View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";
import DraggableFlatList from "react-native-draggable-flatlist";

import MyButton from "../../reusedComponents/MyButton";

import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import fonts from "../../reusedComponents/fonts";

export default function ValuesComplete({ route, navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userValues = useSelector((store) => store.user.userInfo.values);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const userId = useSelector((store) => store.user.userInfo.id);
  const myTheme = useTheme();
  const [values, setValues] = useState([]);

  console.log(userValues);

  // Checks if route.params has a a key "params" holding the values coming from the front end (probably will be obsolete when values are hosted in state)
  // (navigation.navigate(screen, { (params object with nested screen and params) } cannot hold array in base params key)
  // and sets values to key if .params is there or not

  useEffect(() => {
    setValues(route.params.params ? route.params.params : route.params);
  });

  // Resets values stored in state and returns user to values select

  const onRetakePress = async () => {
    // dispatch({ type: "RESET_USER_VALUES" });

    // navigation.navigate("ValuesSelect");

    try {
      const response = await axios.post(
        `${SERVER_ADDRESS}/api/v1/update_values`,
        {
          user_id: userId,
          values: [],
        },
        { headers: { [AUTH_HEADER]: accessToken } }
      );

      await dispatch({ type: "SET_USER_INFO", payload: response.data });

      navigation.navigate("ValuesSelect");
    } catch (error) {
      console.log(error);
    }
  };

  // Sends the values to be stored into state and navigates to landing

  const onContinuePress = async () => {
    const getArrayOfId = () => {
      let array = [];

      for (const value of values) {
        array.push(value.id);
      }

      return array;
    };

    try {
      const response = await axios.post(
        `${SERVER_ADDRESS}/api/v1/update_values`,
        {
          user_id: userId,
          values: getArrayOfId(),
        },
        { headers: { [AUTH_HEADER]: accessToken } }
      );

      await dispatch({ type: "SET_USER_INFO", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 38,
      textAlign: "center",
      color: myTheme.colors.grey,
    },
    subheaderText: {
      marginTop: "5%",
      marginBottom: "10%",
      fontSize: 20,
      textAlign: "center",
      fontFamily: fonts.regular,
      color: myTheme.colors.grey,
    },
    valueContainer: {
      marginBottom: "5%",
      padding: "2.5%",
      borderRadius: 10,
      borderColor: myTheme.colors.grey,
      borderWidth: 1,
    },
    valueText: {
      textAlign: "center",
      fontSize: 22,
      fontFamily: fonts.regular,
      color: myTheme.colors.grey,
    },
    retakeText: {
      textAlign: "center",
      textDecorationLine: "underline",
      fontFamily: fonts.bold,
      color: myTheme.colors.blue,
    },
  });
  const renderItem = ({ item, drag, isActive, index }) => (
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
      <Text style={styles.valueText}>
        {`${index + 1}.  `}
        {item.name}
      </Text>
    </Pressable>
  );

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={SharedStyles.container}>
      <Text style={styles.headerText}>
        {/* {userValues.length !== 0 ? "Your Values" : "Congratulations!"} */}
      </Text>
      <Text style={styles.subheaderText}>
        Here are your values ranked. You can press and hold each item to grab it
        and drag each item up or down if you are not satisfied with your
        ranking.
      </Text>

      <DraggableFlatList
        scrollEnabled={false}
        data={values}
        onDragEnd={({ data }) => setValues(data)}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />

      <MyButton onPress={onContinuePress} text="Return to my Dashboard" />

      <Pressable onPress={onRetakePress}>
        <Text style={styles.retakeText}>Retake Quiz</Text>
      </Pressable>
    </View>
  );
}
