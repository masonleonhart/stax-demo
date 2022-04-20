import React from "react";
import { useIsFocused } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";

import {
  ScrollView,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { Text, useTheme } from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";
import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

import Firebase from "../../../../config/firebase";
import HeaderComponent from "../../reusedComponents/HeaderComponent";
import { COLORS } from "../../../constants/theme";

export default function Account({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const deviceHeight = Dimensions.get("screen").height;
  const userInfo = useSelector((store) => store.user.userInfo);
  const userValues = useSelector((store) => store.user.userInfo.values);

  const auth = Firebase.auth();

  const valuesNavButton = () => {
    if (userValues.length === 0) {
      navigation.navigate("ValuesStack", {
        screen: "ValuesIntro",
      });
    } else {
      dispatch({ type: "SET_QUIZ_SELECTION", payload: userValues });

      navigation.navigate("ValuesStack", {
        screen: "ValuesComplete",
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

  const AccountPressable = ({ text, onPress }) => (
    <Pressable style={styles.pressable} onPress={onPress}>
      <Text style={styles.pressableText}>{text}</Text>
    </Pressable>
  );

  const styles = StyleSheet.create({
    header: {
      backgroundColor: myTheme.colors.red,
      height: deviceHeight * 0.25,
      paddingHorizontal: "5%",
      marginBottom: "2.5%",
    },
    headerTextContainer: {
      marginTop: "5%",
    },
    headerSettingsText: {
      color: "white",
      fontSize: 30,
      marginBottom: "5%",
      fontFamily: fonts.bold,
    },
    headerNameText: {
      color: "white",
      fontSize: 40,
      fontFamily: fonts.regular,
    },
    userImage: {
      height: deviceHeight * 0.125,
      width: deviceHeight * 0.125,
      marginTop: "5%",
      borderRadius: 100,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    userInitials: {
      fontFamily: fonts.bold,
      fontSize: 40,
      color: "#404040",
    },
    container: {
      justifyContent: "space-between",
    },
    pressable: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      padding: "5%",
    },
    pressableText: {
      fontFamily: fonts.regular,
      fontSize: 20,
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <>
      <HeaderComponent
        mainTitle="User Settings"
        subTitle={userInfo?.first_name}
        mainTitleStyle={styles.headerSettingsText}
        subTitleStyle={styles.headerNameText}
        backgroundColor={COLORS.red}
      />
      <ScrollView>
        <View style={SharedStyles.container}>
          <AccountPressable text="My Values" onPress={valuesNavButton} />
          {userInfo.providerId === "password" && (
            <AccountPressable
              text="Update User Information"
              onPress={() => navigation.navigate("UpdateUserInfoStack")}
            />
          )}
          <AccountPressable text="Liked Brands" onPress={() => navigation.navigate("LikedBrands")} />
          <AccountPressable
            text="Terms of Use"
            onPress={() => navigation.navigate("TermsOfUse")}
          />
          <MyButton text="Sign Out" onPress={onSignOut} />
        </View>
      </ScrollView>
    </>
  );
}
