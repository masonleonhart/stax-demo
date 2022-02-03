import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { View, StyleSheet, Image, ScrollView, Alert } from "react-native";
import {
  useTheme,
  TextInput,
  Surface,
  Text,
  Appbar,
  configureFonts,
} from "react-native-paper";

import MyButton from "../../reusedComponents/MyButton";
import ActivityModal from "../../modals/ActivityModal";

import fonts from "../../reusedComponents/fonts";
import StaxLogo from "../../../../assets/StaxLogoVerticleCreamWithGreen.png";

import EmptyStateView from "../../reusedComponents/EmptyStateView";

import Firebase from "../../../../config/firebase";

export default function RegisterName({ navigation, route }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState(route.params);
  const [canContinue, setCanContinue] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const auth = Firebase.auth();

  const completedRegisterForm = {
    email: registerForm.email,
    first_name: registerForm.first_name,
    last_name: registerForm.last_name,
  };

  // If there is a form error or any of the fields are empty, you are not allowed to continue

  const handleSignUp = async () => {
    if (!canContinue) {
      Alert.alert("Error", "Missing field, please complete the form.");
    } else {
      try {
        setIsDialogVisible(true);

        await dispatch({ type: "SET_REGISTER_COMPLETED_TRUE" });

        setIsDialogVisible(false);
      } catch (error) {
        setIsDialogVisible(false);

        Alert.alert("Error", error);
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: "SET_PERSONAL_NAME",
      payload: {
        first_name: registerForm.first_name,
        last_name: registerForm.last_name,
      },
    });
  }, [registerForm]);

  useEffect(() => {
    // If any of the form fields are empty, disable the continue button

    if (!registerForm.first_name || !registerForm.last_name) {
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
      height: "25%",
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
      marginVertical: "5%",
    },
    myButton: {
      marginTop: "10%",
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
  });

  // if the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View>
      <Appbar style={styles.appbar} />

      <ActivityModal isDialogVisible={isDialogVisible} />

      <Surface style={styles.logoSurface}>
        <Image source={StaxLogo} resizeMode="contain" style={styles.staxLogo} />
      </Surface>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <TextInput
          value={registerForm.first_name}
          onChangeText={(text) =>
            setRegisterForm({ ...registerForm, first_name: text })
          }
          underlineColor={myTheme.colors.grey}
          label="First Name"
          left={<TextInput.Icon name="account" color={myTheme.colors.green} />}
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
          left={<TextInput.Icon name="account" color={myTheme.colors.green} />}
          style={styles.textInput}
          theme={inputTheme}
        />

        <MyButton
          onPress={() => handleSignUp()}
          text="Continue"
          labelStyle={styles.buttonLabel}
          buttonColor={myTheme.colors.cream}
        />

        <Text style={styles.termsOfUseOne}>
          By creating an account, you agree to the
        </Text>

        <Text style={styles.termsOfUseTwo}>
          <Text style={styles.termsofUseThree}>Terms of Use</Text> and{" "}
          <Text style={styles.termsofUseThree}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </View>
  );
}
