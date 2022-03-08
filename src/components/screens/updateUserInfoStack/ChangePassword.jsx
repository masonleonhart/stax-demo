import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";

import { View, StyleSheet, Alert } from "react-native";
import {
  Text,
  TextInput,
  useTheme,
  configureFonts,
  HelperText,
} from "react-native-paper";

import ActivityModal from "../../modals/ActivityModal";
import MyButton from "../../reusedComponents/MyButton";
import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

import firebase from "firebase";

export default function ChangePassword({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [canContinue, setCanContinue] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [continueClicks, setContinueClicks] = useState(0);
  const [securePassword, setSecurePassword] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const user = firebase.auth().currentUser;

  useEffect(() => {
    // Make it so that the password fields have to match, (red if they dont match and button doesn't work)

    if (
      newPassword.newPassword !== newPassword.confirmNewPassword &&
      newPassword.newPassword &&
      newPassword.confirmNewPassword
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // If any of the form fields are empty, disable the continue button

    if (!newPassword.newPassword || !newPassword.confirmNewPassword) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
    }
  }, [newPassword]);

  const changePassword = async () => {
    setContinueClicks(continueClicks + 1);

    if (passwordError || !canContinue) {
      Alert.alert("Error", "Missing field, please complete the form.");
    } else {
      setIsDialogVisible(true);

      try {
        await user.updatePassword(newPassword.newPassword);

        setIsDialogVisible(false);

        Alert.alert("Success", "Password updated successfully", [
          {
            text: "OK",
            onPress: () =>
            navigation.navigate("UpdateUserInfoLanding"),
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
        <Text style={styles.headerText}>Update Password</Text>
        <Text style={styles.subheaderText}>Enter your new password</Text>
      </View>

      <View>
        <TextInput
          value={newPassword.newPassword}
          onChangeText={(text) =>
            setNewPassword({ ...newPassword, newPassword: text })
          }
          secureTextEntry={securePassword}
          error={continueClicks > 0 && passwordError}
          underlineColor={myTheme.colors.grey}
          label="Password"
          left={<TextInput.Icon name="lock" color={myTheme.colors.blue} />}
          right={
            <TextInput.Icon
              name="eye"
              color={myTheme.colors.blue}
              onPress={() => setSecurePassword(!securePassword)}
            />
          }
          style={styles.textInput}
          theme={inputTheme}
        />

        <HelperText type="error" visible={continueClicks > 0 && passwordError}>
          Passwords do not match
        </HelperText>

        <TextInput
          value={newPassword.confirmNewPassword}
          onChangeText={(text) =>
            setNewPassword({ ...newPassword, confirmNewPassword: text })
          }
          secureTextEntry={securePassword}
          error={continueClicks > 0 && passwordError}
          underlineColor={myTheme.colors.grey}
          label="Confirm Password"
          left={<TextInput.Icon name="lock" color={myTheme.colors.blue} />}
          right={
            <TextInput.Icon
              name="eye"
              color={myTheme.colors.blue}
              onPress={() => setSecurePassword(!securePassword)}
            />
          }
          style={styles.textInput}
          theme={inputTheme}
        />

        <HelperText type="error" visible={continueClicks > 0 && passwordError}>
          Passwords do not match
        </HelperText>
      </View>

      <MyButton
        text="Update Password"
        onPress={changePassword}
        style={styles.button}
      />
    </View>
  );
}
