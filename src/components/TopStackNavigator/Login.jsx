import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import axios from "axios";

import config from "../../redux/sagas/server.config";

import { Image, StyleSheet, View } from "react-native";

import { Appbar } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";

import SharedStyles from "../reusedComponents/SharedStyles";
import MyButton from "../reusedComponents/MyButton";
import StaxLogo from "../../../assets/StaxLogoVerticleWhiteNew.png";
import EmptyStateView from "../reusedComponents/EmptyStateView";

// Renders the login page

function Login({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userStore = useSelector((store) => store.user);

  const auth0Domain = "dev-ndj3izs8.us.auth0.com";
  const auth0ClientId = "SXnendrTRmYP6v3oWkMHEK3QHQTVL8sz";

  // on sign in press, opens a web view to auth0 to login, on successful return from auth0 save the access
  // token into redux store for further use, decode the jwt id token, set the state of user info with the
  // gathered data from auth0, and send the data to the backend to create a new user or update the access token
  // then navigates to the landing page if successful login

  const loginWithAuth0 = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const useProxy = Platform.select({ web: false, default: true });
    const redirectUri = AuthSession.makeRedirectUri({ useProxy });

    const toQueryString = (params) =>
      "?" +
      Object.entries(params)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

    // Structure the auth parameters and URL
    const params = {
      prompt: "login",
      client_id: auth0ClientId,
      redirect_uri: redirectUri,
      // response_type:
      // id_token will return a JWT token with the profile as described on the scope
      // token will return access_token to use with further api calls
      response_type: "token id_token",
      nonce: "nonce", // ideally, this will be a random value
      scope: "openid profile email",
    };

    const queryParams = toQueryString(params);
    const authUrl = `https://${auth0Domain}/authorize${queryParams}`;

    let response;

    try {
      response = await AuthSession.startAsync({
        authUrl,
        showInRecents: true,
      });
    } catch (error) {
      console.log("error in validating user from auth0", error);
    }

    const decodedIdToken = jwtDecode(response.params.id_token);

    dispatch({
      type: "SET_ACCESS_TOKEN",
      payload: response.params.access_token,
    });

    try {
      await axios
        .post(`${config.serverAddress}/api/v1/authenticate-user`, {
          access_token: userStore.userAccessToken,
          first_name: decodedIdToken.given_name,
          last_name: decodedIdToken.family_name,
          email: decodedIdToken.email,
        })
        .then(() => navigation.navigate("Landing"));
    } catch (error) {
      console.log("error in sending userInfo to data service", error);
    }
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
    myButton: {
      marginTop: "10%",
      marginBottom: "0%",
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

      <View style={SharedStyles.container}>
        <MyButton
          onPress={loginWithAuth0}
          text="Log in with Auth0"
          style={styles.myButton}
        />
      </View>
    </LinearGradient>
  );
}

export default Login;
