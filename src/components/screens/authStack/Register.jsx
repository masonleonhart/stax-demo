import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import { StyleSheet, Image, View, ScrollView, Pressable } from "react-native";
import {
  TextInput,
  Text,
  Surface,
  Appbar,
  useTheme,
  HelperText,
  configureFonts,
} from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";

import fonts from "../../reusedComponents/fonts";
import StaxLogo from "../../../../assets/StaxLogoVerticleCreamWithGreen.png";

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

  const auth = Firebase.auth();

  // If there is a form error or any of the fields are empty, you are not allowed to continue

  const handleContinue = async () => {
    setContinueClicks(continueClicks + 1);

    if (passwordError || !canContinue) {
      return;
    } else {
      try {
        await auth.createUserWithEmailAndPassword(
          registerForm.email,
          registerForm.password
        );

        navigation.navigate("RegisterName", registerForm);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLoginNavPress = () => {
    dispatch({ type: "SET_REGISTER_COMPLETED_TRUE" });

    navigation.navigate("Login");
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
      !registerForm.confirmPassword
    ) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
    }
  }, [registerForm]);

  // Shared theme for text inputs

  const inputTheme = {
    colors: {
      primary: myTheme.colors.green,
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

  // Styles for the RegisterAccount view

  const styles = StyleSheet.create({
    appbar: {
      backgroundColor: "transparent",
    },
    logoSurface: {
      height: "20%",
      width: "100%",
      backgroundColor: "transparent",
      marginBottom: "5%",
    },
    staxLogo: {
      height: "100%",
      width: "40%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    scrollView: {
      flexGrow: 1,
      paddingBottom: 250,
      marginHorizontal: "5%",
    },
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    buttonLabel: {
      color: myTheme.colors.green,
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
      color: myTheme.colors.green,
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
    signInTextGreen: {
      marginLeft: "5%",
      color: myTheme.colors.green,
      fontFamily: fonts.bold,
    },
  });

  // if the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View>
      <Appbar style={styles.appbar} />

      <Surface style={styles.logoSurface}>
        <Image source={StaxLogo} resizeMode="contain" style={styles.staxLogo} />
      </Surface>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          value={registerForm.email}
          onChangeText={(text) =>
            setRegisterForm({ ...registerForm, email: text })
          }
          underlineColor={myTheme.colors.grey}
          label="Email"
          autoCapitalize="none"
          left={<TextInput.Icon name="email" color={myTheme.colors.green} />}
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
          left={<TextInput.Icon name="lock" color={myTheme.colors.green} />}
          right={
            <TextInput.Icon
              name="eye"
              color={myTheme.colors.green}
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
          left={<TextInput.Icon name="lock" color={myTheme.colors.green} />}
          right={
            <TextInput.Icon
              name="eye"
              color={myTheme.colors.green}
              onPress={() => setSecurePassword(!securePassword)}
            />
          }
          style={styles.textInput}
          theme={inputTheme}
        />

        <HelperText type="error" visible={continueClicks > 0 && passwordError}>
          Passwords do not match
        </HelperText>

        <MyButton
          onPress={() => handleContinue()}
          text="Continue"
          labelStyle={styles.buttonLabel}
          buttonColor={myTheme.colors.cream}
        />

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
          onPress={handleLoginNavPress}
        >
          <View style={styles.signInText}>
            <Text style={styles.signInTextGrey}>Already have an account?</Text>
            <Text style={styles.signInTextGreen}>Sign In</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}
