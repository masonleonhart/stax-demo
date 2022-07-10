import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet, Alert } from "react-native";
import {
  Text,
  TextInput,
  useTheme,
  configureFonts,
} from "react-native-paper";

import ActivityModal from "../../modals/ActivityModal";
import MyButton from "../../reusedComponents/MyButton";
import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function ResetPassword({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const [form, setNewPassword] = useState({
    email: "",
  });
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const changePassword = async () => {
    if (!form.email) {
      Alert.alert("Error", "Missing field, please complete the form.");
    } else {
      setIsDialogVisible(true);

      try {
        await auth.sendPasswordResetEmail(form.email);

        setIsDialogVisible(false);

        Alert.alert("Success", "Email sent!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } catch (error) {
        setIsDialogVisible(false);
        Alert.alert("Error", error.message);
      }
    }
  };

  // Shared theme for text inputs

  const inputTheme = {
    colors: {
      primary: myTheme.colors.blue,
      text: myTheme.colors.grey,
      placeholder: myTheme.colors.grey,
    },
    fonts: configureFonts({
      ios: {
        regular: {
          fontFamily: fonts.bold,
        },
      },
    }),
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "space-between",
    },
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
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    button: {
      marginBottom: "50%",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={[SharedStyles.container, styles.container]}>
      <ActivityModal isDialogVisible={isDialogVisible} />

      <View>
        <Text style={styles.headerText}>Forgot Password?</Text>
        <Text style={styles.subheaderText}>
          Please enter your email and we will send you a link to reset your
          password if that email exists within our system.
        </Text>
      </View>
      <View>
        <TextInput
          value={form.email}
          onChangeText={(text) =>
            setNewPassword({ ...form, email: text })
          }
          underlineColor={myTheme.colors.grey}
          label="Email"
          left={<TextInput.Icon name="email" color={myTheme.colors.blue} />}
          style={styles.textInput}
          theme={inputTheme}
          autoCapitalize="none"
        />
      </View>
      <MyButton
        text="Submit"
        onPress={changePassword}
        style={styles.button}
      />
    </View>
  );
}
