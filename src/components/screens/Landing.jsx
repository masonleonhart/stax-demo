import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { Text, useTheme } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";

import MyButton from "../reusedComponents/MyButton";

import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function Landing({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const userValues = useSelector((store) => store.user.values);

  const styles = StyleSheet.create({
    landingHeader: {
      backgroundColor: myTheme.colors.red
    },
    welcomeTextWrapper: {
      borderBottomColor: myTheme.colors.gray,
      borderBottomWidth: 1,
      paddingBottom: "10%",
      marginTop: "20%",
      marginBottom: "10%",
    },
    welcomeText: {
      fontSize: 18,
      lineHeight: 27,
      textAlign: "center",
    },
    valuesWrapper: {
      borderBottomColor: myTheme.colors.gray,
      borderBottomWidth: 1,
      paddingBottom: "10%",
    },
    valuesHeaderText: {
      color: myTheme.colors.green,
      fontSize: 24,
      fontWeight: "500",
      marginBottom: "5%",
    },
    value: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "5%",
      flex: 1,
    },
    valueText: {
      color: myTheme.colors.green,
      fontSize: 20,
      fontWeight: "500",
      marginLeft: "5%",
    },
    valuesButton: {
      marginTop: "10%%",
      marginBottom: "0%",
    },
    getStartedButton: {
      marginTop: "10%",
    },
  });

  const RenderValue = ({ icon, name }) => {
    return (
      <View style={styles.value}>
        <MaterialCommunityIcons
          name={icon}
          color={myTheme.colors.green}
          size={30}
        />
        <Text style={styles.valueText}>{name}</Text>
      </View>
    );
  };

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView>
      <View style={[SharedStyles.flexRow, styles.landingHeader]}>
        <View><Text>Welcome Back</Text></View>
        <View></View>
      </View>
      <View style={styles.welcomeTextWrapper}>
        <Text style={styles.welcomeText}>
          Welcome to the Stax Barcode Scanner! Use this application to scan any
          product to see how it will align to your personal values
        </Text>
      </View>

      <View style={styles.valuesWrapper}>
        <Text style={styles.valuesHeaderText}>Your Selected Values</Text>

        {userValues.map((value) => (
          <RenderValue key={value.id} icon={value.icon} name={value.name} />
        ))}

        <MyButton
          style={styles.valuesButton}
          text="Change your Values"
          onPress={() => navigation.navigate("ValuesIntro")}
        />
      </View>

      <MyButton
        style={styles.getStartedButton}
        text="Get Started"
        onPress={() => navigation.navigate("BarcodeScanner")}
      />
    </ScrollView>
  );
}
