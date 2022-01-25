import React from "react";
import { useIsFocused } from "@react-navigation/core";

import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { Text, useTheme } from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";
import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

import Firebase from "../../../../config/firebase";

export default function Account({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  const auth = Firebase.auth();

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
    container: {
      justifyContent: "space-between",
    },
    pressable: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      padding: "5%"
    },
    pressableText: {
      fontFamily: fonts.regular,
      fontSize: 20
    }
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView contentContainerStyle={[SharedStyles.container, styles.container]}>
      <View>
        <AccountPressable
          text="Terms of Use"
          onPress={() => navigation.navigate("TermsOfUse")}
        />
      </View>
      <MyButton text="Sign Out" onPress={onSignOut} />
    </ScrollView>
  );
}
