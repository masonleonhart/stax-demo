import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import axios from "axios";

import { SERVER_ADDRESS, AUTH_0_DOMAIN, AUTH_0_CLIENT_ID } from "@env";

import { Image, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import StaxLogo from "../../../../assets/StaxLogoVerticleWhiteNew.png";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

// Renders the login page

function Login({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const userStore = useSelector((store) => store.user);

  // When the page finishes rendering, open the webview to run login

  useEffect(() => {
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
        client_id: AUTH_0_CLIENT_ID,
        redirect_uri: redirectUri,
        // response_type:
        // id_token will return a JWT token with the profile as described on the scope
        // token will return access_token to use with further api calls
        response_type: "token id_token",
        nonce: "nonce", // ideally, this will be a random value
        scope: "openid profile email family_name given_name",
      };

      const queryParams = toQueryString(params);
      const authUrl = `https://${AUTH_0_DOMAIN}/authorize${queryParams}`;

      let response;
      let decodedIdToken;

      try {
        response = await AuthSession.startAsync({
          authUrl,
          showInRecents: true,
        });

        if (response.type === "success") {
          decodedIdToken = jwtDecode(response.params.id_token);

          dispatch({
            type: "SET_ACCESS_TOKEN",
            payload: response.params.access_token,
          });
        } else if (response.type === "cancel") {
          loginWithAuth0();
        } else if (response.type === "error") {
          console.log("error in validating user from auth0", response);
        }
      } catch (error) {
        console.log("error in validating user from auth0", error);
      }

      // checks the id token for a "...user_metadata" property that is an object with keys of given_name and family_name,
      // if it is there, set first and last name to the given and family names in the metadata object, if it is not there,
      // set first and last names to the regular given and family name keys that appear with social accounts

      let first_name = decodedIdToken["https://dev.getstax.co/user_metadata"]
        ? decodedIdToken["https://dev.getstax.co/user_metadata"].given_name
        : decodedIdToken.given_name;

      let last_name = decodedIdToken["https://dev.getstax.co/user_metadata"]
        ? decodedIdToken["https://dev.getstax.co/user_metadata"].family_name
        : decodedIdToken.family_name;

      if (response.type === "success") {
        try {
          await axios
            .post(`${SERVER_ADDRESS}/api/v1/authenticate-user`, {
              access_token: response.params.access_token,
              first_name,
              last_name,
              email: decodedIdToken.email,
            })
            .then(() => navigation.navigate("Landing"));
        } catch (error) {
          console.log("error in sending userInfo to data service", error);
        }
      }
    };

    loginWithAuth0();
  }, []);

  const styles = StyleSheet.create({
    linearGradient: {
      height: "100%",
      width: "100%",
      flex: 1,
      justifyContent: "center",
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
      <Image source={StaxLogo} resizeMode="contain" style={styles.staxLogo} />
    </LinearGradient>
  );
}

export default Login;
