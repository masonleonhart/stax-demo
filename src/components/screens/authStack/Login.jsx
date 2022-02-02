import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Google from "expo-auth-session/providers/google";
import jwt_decode from "jwt-decode";
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_IOS_STANDALONE_CLIENT_ID } from "@env";
import Constants from "expo-constants";

import { Image, StyleSheet, View, ScrollView, Pressable } from "react-native";

import {
  TextInput,
  Text,
  Appbar,
  useTheme,
  configureFonts,
} from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";

import { SocialIcon } from "react-native-elements";

import MyButton from "../../reusedComponents/MyButton";

import fonts from "../../reusedComponents/fonts";
import StaxLogo from "../../../../assets/StaxLogoVerticleWhiteNew.png";

import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

import Firebase from "../../../../config/firebase";
import firebase from "firebase";

// Renders the login page

export default function Login({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.user.userInfo);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const auth = Firebase.auth();

  const onLogin = async () => {
    try {
      if (loginForm.email !== "" && loginForm.password !== "") {
        await auth.signInWithEmailAndPassword(
          loginForm.email,
          loginForm.password
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      Constants.appOwnership !== "expo"
        ? GOOGLE_IOS_STANDALONE_CLIENT_ID
        : GOOGLE_IOS_CLIENT_ID,
  });

  const googleSignIn = async () => {
    try {
      const credential = await firebase.auth.GoogleAuthProvider.credential(
        response.params.id_token
      );

      const decodedIdToken = jwt_decode(response.params.id_token);

      await dispatch({
        type: "SET_PERSONAL_NAME",
        payload: {
          first_name: decodedIdToken.given_name,
          last_name: decodedIdToken.family_name,
        },
      });

      await dispatch({ type: "SET_EMAIL", payload: decodedIdToken.email });

      await auth.signInWithCredential(credential);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      googleSignIn();
    }
  }, [response]);

  const handleRegisterNavPress = () => {
    dispatch({ type: "SET_REGISTER_COMPLETED_FALSE" });

    navigation.navigate("Register");
  };

  // Shared theme for text inputs

  const inputTheme = {
    colors: {
      primary: "white",
      text: "white",
      placeholder: "white",
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
    linearGradient: {
      height: "100%",
      width: "100%",
    },
    appbar: {
      backgroundColor: "transparent",
    },
    staxLogo: {
      height: "25%",
      width: "40%",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "5%",
    },
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    myButton: {
      marginTop: "10%",
      marginBottom: "10%",
    },
    buttonLabel: {
      color: myTheme.colors.grey,
    },
    forgotPassword: {
      marginTop: "15%",
      color: myTheme.colors.cream,
      marginLeft: "auto",
      marginRight: "auto",
      fontFamily: fonts.regular,
    },
    registerWrapper: {
      marginTop: "15%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "1%",
    },
    registerTextCream: {
      color: myTheme.colors.cream,
      fontFamily: fonts.regular,
    },
    registerTextWhite: {
      marginLeft: "5%",
      color: "white",
      fontWeight: "bold",
      fontFamily: fonts.bold,
    },
  });

  // if the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <LinearGradient
      colors={["#FEBFB0", "#FE7452", "#FE3F12"]}
      style={styles.linearGradient}
    >
      <Appbar style={styles.appbar} />

      <Image source={StaxLogo} resizeMode="contain" style={styles.staxLogo} />

      <ScrollView contentContainerStyle={SharedStyles.container}>
        <TextInput
          value={loginForm.email}
          onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
          underlineColor="white"
          label="Email"
          autoCapitalize="none"
          left={<TextInput.Icon name="email" color="white" />}
          style={styles.textInput}
          theme={inputTheme}
        />

        <TextInput
          secureTextEntry={true}
          value={loginForm.password}
          onChangeText={(text) =>
            setLoginForm({ ...loginForm, password: text })
          }
          underlineColor="white"
          label="Password"
          left={<TextInput.Icon name="lock" color="white" />}
          style={styles.textInput}
          theme={inputTheme}
        />

        <MyButton
          onPress={() => onLogin()}
          text="Sign In"
          style={styles.myButton}
          labelStyle={styles.buttonLabel}
          buttonColor={myTheme.colors.cream}
        />

        <SocialIcon
          title={"Sign In With Google"}
          button={true}
          type={"google"}
          onPress={promptAsync}
          light
        />

        <Text style={styles.forgotPassword}>Forgot your password?</Text>

        <Pressable
          style={styles.registerWrapper}
          underlayColor="rgba(0, 0, 0, .1)"
          rippleColor="rgba(0, 0, 0, .1)"
          onPress={handleRegisterNavPress}
        >
          <View style={SharedStyles.flexRow}>
            <Text style={styles.registerTextCream}>Don't have an account?</Text>
            <Text style={styles.registerTextWhite}>Join</Text>
          </View>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}
