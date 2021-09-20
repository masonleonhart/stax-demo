import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import { Image, StyleSheet, View, ScrollView, Pressable } from "react-native";

import { TextInput, Text, Appbar, useTheme } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";

import MyButton from "../reusedComponents/MyButton";

import StaxLogo from "../../../assets/StaxLogoVerticleWhiteNew.png";

import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";

// Renders the login page

function Login({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userStore = useSelector((store) => store.user);
  const myTheme = useTheme();
  const [loginForm, setLoginForm] = useState({
    email: "Nathalie",
  });

  const demoUser = {
    email: "Nathalie",
  };

  const handleSignIn = () => {
    if (demoUser.email === loginForm.email) {
      navigation.navigate("Landing");
    }
  };

  // Compares the email text field to a current list of users, if the email matches, get the rest of the user information,
  // clear the login form, and send the user into the application

  // const handleSignIn = () => {
  //   userStore.allUsersReducer.map((user) => {
  //     if (user.email === loginForm.email) {
  //       dispatch({ type: "FETCH_USER", payload: user.id });

  //       setLoginForm({
  //         email: "",
  //       });

  //       navigation.navigate("Tabs");
  //     }
  //   });
  // };

  // Fetches all user to so emails of the current sign in and current users can be compared

  //  useEffect(() => {
  //    dispatch({ type: "FETCH_ALL_USERS" });
  //  }, []);

  // Shared theme for text inputs

  const inputTheme = {
    colors: {
      primary: myTheme.colors.blue,
      text: "white",
      placeholder: "white",
    },
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
      marginBottom: "0%",
    },
    forgotPassword: {
      marginTop: "15%",
      color: myTheme.colors.cream,
      marginLeft: "auto",
      marginRight: "auto",
    },
    registerWrapper: {
      marginTop: "15%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "1%",
    },
    registerTextCream: {
      color: myTheme.colors.cream,
    },
    registerTextWhite: {
      marginLeft: "5%",
      color: "white",
      fontWeight: "bold",
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
          underlineColor="white"
          label="Password"
          left={<TextInput.Icon name="lock" color="white" />}
          style={styles.textInput}
          theme={inputTheme}
        />

        <MyButton
          onPress={() => handleSignIn()}
          text="Sign In"
          style={styles.myButton}
        />

        <Text style={styles.forgotPassword}>Forgot your password?</Text>

        <Pressable
          style={styles.registerWrapper}
          underlayColor="rgba(0, 0, 0, .1)"
          rippleColor="rgba(0, 0, 0, .1)"
          onPress={() => navigation.navigate("Register")}
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

export default Login;
