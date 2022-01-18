import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { Text, useTheme, IconButton } from "react-native-paper";
import { ScrollView, View, StyleSheet, Dimensions, Image } from "react-native";

import MyButton from "../../reusedComponents/MyButton";
import userImage from "../../../../assets/userImage.png";

import fonts from "../../reusedComponents/fonts";
import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

import Firebase from "../../../../config/firebase";

export default function Landing({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const deviceHeight = Dimensions.get("screen").height;
  const userValues = useSelector((store) => store.user.userValues);
  const userInfo = useSelector((store) => store.user.userInfo);

  const auth = Firebase.auth();

  const topValuesButtonPress = () => {
    if (userValues.length === 0) {
      navigation.navigate("ValuesStack", {
        screen: "ValuesIntro",
      });
    } else {
      navigation.navigate("ValuesStack", {
        screen: "ValuesComplete",
        params: { params: userValues },
      });
    }
  };

  const onSignOut = async () => {
    try {
      navigation.navigate("AuthStack", { screen: "Login" });

      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  // surround with useMemo
  // https://reactjs.org/docs/hooks-reference.html#usememo

  const styles = StyleSheet.create({
    landingHeader: {
      backgroundColor: myTheme.colors.red,
      height: deviceHeight * 0.25,
      paddingHorizontal: "5%",
      marginBottom: "2.5%",
    },
    headerTextContainer: {
      marginTop: "5%",
    },
    headerWelcomeText: {
      color: "white",
      fontSize: 25,
      marginBottom: "5%",
      fontFamily: fonts.bold,
    },
    headerNameText: {
      color: "#e3e3e3",
      fontSize: 35,
      fontFamily: fonts.regular,
    },
    userImage: {
      height: deviceHeight * 0.125,
      width: deviceHeight * 0.125,
      marginTop: "5%",
      borderRadius: 100,
    },
    valuesWrapper: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      paddingBottom: "10%",
    },
    valuesHeaderText: {
      color: myTheme.colors.grey,
      fontSize: 20,
      fontFamily: fonts.medium,
    },
    value: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "5%",
      flex: 1,
      borderBottomColor: "#e3e3e3",
      borderBottomWidth: 1,
      paddingBottom: "5%",
    },
    valueText: {
      color: myTheme.colors.grey,
      fontSize: 20,
      fontFamily: fonts.regular,
      marginLeft: "5%",
    },
    valuesButton: {
      marginBottom: "0%",
    },
    getStartedButton: {
      marginTop: "10%",
    },
  });

  // move component outside of top component and pass theme down into the component as a prop

  const RenderValue = ({ icon, name }) => {
    return (
      <View style={styles.value}>
        <MaterialCommunityIcons
          name={icon}
          color={myTheme.colors.blue}
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
          <Text style={styles.headerNameText}>{userInfo.first_name}</Text>
        </View>
        <Image
          source={userImage}
          style={styles.userImage}
          resizeMode="contain"
        />
      </View>

      <View style={[SharedStyles.container]}>
        <View style={styles.valuesWrapper}>
          <View style={SharedStyles.flexRow}>
            <Text style={styles.valuesHeaderText}>My Top Values</Text>
            <IconButton
              icon="chevron-right"
              size={30}
              color={myTheme.colors.grey}
              onPress={topValuesButtonPress}
            />
          </View>

          {userValues.map((value) => (
            <RenderValue
              key={value.id}
              icon={value.icon_name}
              name={value.name}
            />
          ))}

          {userValues.length === 0 && (
            <MyButton
              style={styles.valuesButton}
              text="Take Our Values Quiz"
              onPress={() => navigation.navigate("ValuesStack")}
            />
          )}
        </View>

        <MyButton
          style={styles.getStartedButton}
          disabled={userValues.length === 0}
          text={
            userValues.length === 0
              ? "Please Take the Values Quiz"
              : "Scan a Products Barcode"
          }
          onPress={() => navigation.navigate("BarcodeScanner")}
        />

        <MyButton onPress={() => onSignOut()} text="Sign Out" />
      </View>
    </ScrollView>
  );
}
