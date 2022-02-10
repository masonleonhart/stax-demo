import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch } from "react-redux";

import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";
import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function ValuesBreak({ navigation, route }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const [values, setValues] = useState(route.params);

  const onSkipPress = () => {
    dispatch({ type: "SET_QUIZ_SELECTION", payload: values });

    navigation.navigate("ValuesComplete");
  };

  const styles = StyleSheet.create({
    headerText: {
      marginTop: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    exampleText: {
      marginTop: "5%",
      fontSize: 20,
      fontFamily: fonts.bold,
    },
    exampleWrapper: {
      flex: 1,
      marginBottom: "5%",
    },
    imageBackground: {
      flex: 1,
      marginVertical: "5%",
      borderRadius: 10,
      overflow: "hidden",
    },
    scrim: {
      flex: 1,
      padding: "5%",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, .2)",
    },
    valueNameText: {
      fontFamily: fonts.bold,
      color: "white",
      fontSize: 30,
      marginBottom: "5%",
    },
    valueDescriptionText: {
      fontSize: 24,
      color: "white",
      fontFamily: fonts.bold,
    },
    skipPressable: {
      marginBottom: "10%",
    },
    skipText: {
      textAlign: "center",
      textDecorationLine: "underline",
      fontFamily: fonts.bold,
      color: myTheme.colors.blue,
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView style={SharedStyles.container}>
      <View>
        <Text style={styles.headerText}>Great Work!</Text>
        <Text style={styles.headerText}>
          On the next screen, we'll ask you a few questions to help rank your 5
          selections
        </Text>
      </View>

      <View style={styles.exampleWrapper}>
        <Text style={styles.exampleText}>Example</Text>
        <ImageBackground
          source={{
            uri: "https://images.pond5.com/cartoon-animation-trees-field-footage-055967007_iconl.jpeg",
          }}
          style={styles.imageBackground}
        >
          <View style={styles.scrim}>
            <Text style={styles.valueNameText}>Low Carbon Footprint</Text>
            <Text style={styles.valueDescriptionText}>
              Effectively limit the amount of greenhouse gasses produced
            </Text>
          </View>
        </ImageBackground>

        <ImageBackground
          source={{
            uri: "https://media.istockphoto.com/vectors/crowd-of-young-and-elderly-men-and-women-in-trendy-hipster-clothes-vector-id1202344480?k=20&m=1202344480&s=612x612&w=0&h=PCU3ePuJWydABubaWLzEMKILX1iFvDR7dQBgm5IyMIs=",
          }}
          style={styles.imageBackground}
        >
          <View style={styles.scrim}>
            <Text style={styles.valueNameText}>Diverse Leadership</Text>
            <Text style={styles.valueDescriptionText}>
              Strive for leadership by women, veterans, or minoritized people
            </Text>
          </View>
        </ImageBackground>
      </View>

      <MyButton
        text="Let's do it!"
        onPress={() => navigation.navigate("ValuesPairWiseMatching", values)}
      />

      <Pressable
        style={styles.skipPressable}
        onPress={onSkipPress}
      >
        <Text style={styles.skipText}>Skip to End</Text>
      </Pressable>
    </ScrollView>
  );
}
