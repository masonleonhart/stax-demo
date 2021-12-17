import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";

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
import image from "../../../../assets/placeholder.png";

export default function ValuesBreak({ navigation, route }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const [values, setValues] = useState(route.params);

  const styles = StyleSheet.create({
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    subheaderText: {
      marginTop: "5%",
      fontFamily: fonts.regular,
      fontSize: 20,
    },
    exampleText: {
      marginTop: "10%",
      fontSize: 20,
      fontFamily: fonts.bold,
    },
    exampleWrapper: { flex: 1, marginBottom: "5%" },
    pressable: {
      height: "35%",
      marginVertical: "5%",
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
      fontFamily: fonts.bold,
      color: "white",
      fontSize: 28,
      marginBottom: "5%",
    },
    valueDescriptionText: {
      fontSize: 26,
      color: "white",
      fontFamily: fonts.regular,
    },
    skipButton: {
      marginBottom: "0%",
    },
    skipLabel: {
      color: myTheme.colors.grey,
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
        <Text style={styles.subheaderText}>
          Or skip to the end if you're sure on the ranking of your values
        </Text>
      </View>

      <View style={styles.exampleWrapper}>
        <Text style={styles.exampleText}>Example</Text>
        <Pressable style={styles.pressable}>
          <ImageBackground source={image} style={styles.imageBackground}>
            <View style={styles.scrim}>
              <Text style={styles.valueNameText}>Low Carbon Footprint</Text>
              <Text style={styles.valueDescriptionText}>
                This is a description. Such a good description.
              </Text>
            </View>
          </ImageBackground>
        </Pressable>

        <Pressable style={styles.pressable}>
          <ImageBackground source={image} style={styles.imageBackground}>
            <View style={styles.scrim}>
              <Text style={styles.valueNameText}>Diverse Leadership</Text>
              <Text style={styles.valueDescriptionText}>
                This is a description. Such a good description.
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>

      <MyButton
        text="Skip to End"
        onPress={() => navigation.navigate("ValuesComplete", values)}
        style={styles.skipButton}
        labelStyle={styles.skipLabel}
        buttonColor="#e3e3e3"
      />

      <MyButton
        text="Let's do it!"
        onPress={() => navigation.navigate("ValuesPairWiseMatching", values)}
      />
    </ScrollView>
  );
}
