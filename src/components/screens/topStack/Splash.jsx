import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import Firebase from "../../../../config/firebase";
import axios from "axios";

import { SERVER_ADDRESS } from "@env";

import { View, ImageBackground } from "react-native";

import SplashImage from "../../../../assets/stax-splash.png";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

// Renders the login page

export default function Splash({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const registerCompleted = useSelector(
    (store) => store.user.registerCompleted
  );
  const first_name = useSelector((store) => store.user.personalName.first_name);
  const last_name = useSelector((store) => store.user.personalName.last_name);
  const email = useSelector((store) => store.user.email);

  const auth = Firebase.auth();

  // When the page finished rendering, call the server to retrieve values

  useEffect(() => {
    axios
      .get(`${SERVER_ADDRESS}/api/v1/base-values`)
      .then((res) => {
        dispatch({ type: "SET_VALUES_LIST", payload: res.data });
      })
      .catch((err) => console.log(err));
  }, []);

  // When the page finishes rendering, open the webview to run login

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        try {
          if (authenticatedUser && registerCompleted) {
            const authenticateData = {
              access_token:
                authenticatedUser.toJSON().stsTokenManager.accessToken,
              first_name,
              last_name,
              email: !email ? authenticatedUser.email : email,
            };

            const response = await axios.post(
              `${SERVER_ADDRESS}/api/v1/authenticate-user`,
              authenticateData
            );

            const userData = {
              ...response.data,
              accessToken:
                authenticatedUser.toJSON().stsTokenManager.accessToken,
              providerId: authenticatedUser.providerData[0].providerId,
            };

            await dispatch({ type: "SET_USER_INFO", payload: userData });

            setTimeout(
              () => navigation.navigate("TabStack", { screen: "Landing" }),
              1000
            );
          } else {
            setTimeout(() => navigation.navigate("AuthStack"), 1000);
          }
        } catch (error) {
          console.log(error);
        }
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [registerCompleted, first_name, last_name]);

  // if the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
        source={SplashImage}
      />
    </View>
  );
}
