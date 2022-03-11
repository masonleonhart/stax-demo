import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import { StyleSheet, View, Pressable, Alert } from "react-native";
import {
  TextInput,
  Text,
  useTheme,
  HelperText,
  configureFonts,
} from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


import MyButton from "../../reusedComponents/MyButton";
import ActivityModal from "../../modals/ActivityModal";

import fonts from "../../reusedComponents/fonts";

import EmptyStateView from "../../reusedComponents/EmptyStateView";

import Firebase from "../../../../config/firebase";

// Renders the Register view

export default function RegisterAccount({ navigation }) {
  const myTheme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
  });
  const [securePassword, setSecurePassword] = useState(true);
  const [canContinue, setCanContinue] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [continueClicks, setContinueClicks] = useState(0);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const auth = Firebase.auth();

  // If there is a form error or any of the fields are empty, you are not allowed to continue

  const handleContinue = async () => {
    setContinueClicks(continueClicks + 1);

    if (passwordError || !canContinue) {
      Alert.alert("Error", "Missing field, please complete the form.");
    } else {
      try {
        setIsDialogVisible(true);

        await dispatch({
          type: "SET_PERSONAL_NAME",
          payload: {
            first_name: registerForm.first_name,
            last_name: registerForm.last_name,
          },
        });

        await auth.createUserWithEmailAndPassword(
          registerForm.email,
          registerForm.password
        );

        setIsDialogVisible(false);
      } catch (error) {
        setIsDialogVisible(false);

        "messagee" in error
          ? Alert.alert("Error", error.message)
          : console.log(error);
      }
    }
  };

  useEffect(() => {
    // Make it so that the password fields have to match, (red if they dont match and button doesn't work)

    if (
      registerForm.password !== registerForm.confirmPassword &&
      registerForm.password &&
      registerForm.confirmPassword
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // If any of the form fields are empty, disable the continue button

    if (
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword ||
      !registerForm.first_name ||
      !registerForm.last_name
    ) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
    }
  }, [registerForm]);

  // Shared theme for text inputs

  const inputTheme = {
    colors: {
      primary: myTheme.colors.blue,
      text: "black",
      placeholder: "black",
    },
    fonts: configureFonts({
      ios: {
        regular: {
          fontFamily: fonts.bold,
        },
      },
    }),
  };

  // Styles for the RegisterAccount view

  const styles = StyleSheet.create({
    scrollView: {
      flexGrow: 1,
      marginHorizontal: "5%",
    },
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
      color: myTheme.colors.grey,
    },
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    termsOfUseOne: {
      marginTop: "10%",
      color: myTheme.colors.grey,
      textAlign: "center",
      fontFamily: fonts.regular,
    },
    termsOfUseTwo: {
      color: myTheme.colors.grey,
      marginLeft: "auto",
      marginRight: "auto",
      fontFamily: fonts.regular,
    },
    termsofUseThree: {
      textDecorationLine: "underline",
      color: myTheme.colors.blue,
      fontFamily: fonts.regular,
    },
    signInWrapper: {
      marginTop: "10%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "1%",
    },
    signInText: {
      flexDirection: "row",
    },
    signInTextGrey: {
      color: myTheme.colors.grey,
      fontFamily: fonts.regular,
    },
    signInTextBlue: {
      marginLeft: "5%",
      color: myTheme.colors.blue,
      fontFamily: fonts.bold,
    },
  });

  // if the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
      <ActivityModal isDialogVisible={isDialogVisible} />

      <Text style={styles.headerText}>Sign up with Stax</Text>

      <View>
        <TextInput
          value={registerForm.email}
          onChangeText={(text) =>
            setRegisterForm({ ...registerForm, email: text })
          }
          underlineColor={myTheme.colors.grey}
          label="Email"
          autoCapitalize="none"
          left={<TextInput.Icon name="email" color={myTheme.colors.blue} />}
          style={styles.textInput}
          theme={inputTheme}
        />

        <TextInput
          value={registerForm.first_name}
          onChangeText={(text) =>
            setRegisterForm({ ...registerForm, first_name: text })
          }
          underlineColor={myTheme.colors.grey}
          label="First Name"
          autoCapitalize="words"
          left={<TextInput.Icon name="account" color={myTheme.colors.blue} />}
          style={styles.textInput}
          theme={inputTheme}
        />

        <TextInput
          value={registerForm.last_name}
          onChangeText={(text) =>
            setRegisterForm({ ...registerForm, last_name: text })
          }
          underlineColor={myTheme.colors.grey}
          label="Last Name"
          autoCapitalize="words"
          left={<TextInput.Icon name="account" color={myTheme.colors.blue} />}
          style={styles.textInput}
          theme={inputTheme}
        />

        <TextInput
          value={registerForm.password}
          onChangeText={(text) =>
            setRegisterForm({ ...registerForm, password: text })
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
          value={registerForm.confirmPassword}
          onChangeText={(text) =>
            setRegisterForm({ ...registerForm, confirmPassword: text })
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

      <View>
        <MyButton onPress={() => handleContinue()} text="Continue" />

        {/* possible refactor of terms of use */}
        <Text style={styles.termsOfUseOne}>
          By creating an account, you agree to the
        </Text>

        <Text style={styles.termsOfUseTwo}>
          <Text style={styles.termsofUseThree}>Terms of Use</Text> and{" "}
          <Text style={styles.termsofUseThree}>Privacy Policy</Text>
        </Text>

        <Pressable
          style={styles.signInWrapper}
          underlayColor="rgba(0, 0, 0, .1)"
          rippleColor="rgba(0, 0, 0, .1)"
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.signInText}>
            <Text style={styles.signInTextGrey}>Already have an account?</Text>
            <Text style={styles.signInTextBlue}>Sign In</Text>
          </View>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}
