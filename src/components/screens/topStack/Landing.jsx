import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { Text, useTheme } from "react-native-paper";
import { ScrollView, View, StyleSheet, Dimensions, Image } from "react-native";

import MyButton from "../../reusedComponents/MyButton";
import userImage from "../../../../assets/userImage.png";

import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function Landing({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const deviceHeight = Dimensions.get("screen").height;
  const userValues = useSelector((store) => store.user.values);

  const styles = StyleSheet.create({
    landingHeader: {
      backgroundColor: myTheme.colors.red,
      height: deviceHeight * 0.25,
      paddingHorizontal: "5%",
      marginBottom: "5%",
    },
    headerTextContainer: {
      marginTop: "5%",
    },
    headerWelcomeText: {
      color: "white",
      fontSize: 25,
      marginBottom: "5%",
      fontWeight: "bold"
    },
    headerNameText: {
      color: myTheme.colors.lightGrey,
      fontSize: 35,
    },
    userImage: {
      height: deviceHeight * 0.125,
      width: deviceHeight * 0.125,
      marginTop: "5%",
      borderRadius: 100,
    },
    valuesWrapper: {
      borderBottomColor: myTheme.colors.gray,
      borderBottomWidth: 1,
      paddingBottom: "10%",
    },
    valuesHeaderText: {
      color: myTheme.colors.green,
      fontSize: 24,
      fontWeight: "bold",
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
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerWelcomeText}>Welcome back</Text>
          <Text style={styles.headerNameText}>UserName</Text>
        </View>
        <Image
          source={userImage}
          style={styles.userImage}
          resizeMode="contain"
        />
      </View>

      <View style={[SharedStyles.container]}>
        <View style={styles.valuesWrapper}>
          <Text style={styles.valuesHeaderText}>Your Selected Values</Text>

          {userValues.map((value) => (
            <RenderValue key={value.id} icon={value.icon} name={value.name} />
          ))}

          <MyButton
            style={styles.valuesButton}
            text="Change your Values"
            onPress={() => navigation.navigate("ValuesStack")}
          />
        </View>

        <MyButton
          style={styles.getStartedButton}
          text="Get Started"
          onPress={() => navigation.navigate("BarcodeScanner")}
        />
      </View>
    </ScrollView>
  );
}
