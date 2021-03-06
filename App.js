import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { ImageBackground, View } from "react-native";
import SplashImage from "./assets/stax-splash.png";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { Provider as StoreProvider } from "react-redux";
import createSagaMiddlware from "redux-saga";
import { enableScreens } from "react-native-screens";
import * as Font from "expo-font";

import TopStack from "./src/components/navigation/TopStack";

// Redux

import rootReducer from "./src/redux/reducers/_root.reducer";
import rootSaga from "./src/redux/sagas/_root.saga";

// Redux middleware

const sagaMiddleware = createSagaMiddlware();

const middlewareList =
  process.env.NODE_ENV === "development" ? [sagaMiddleware] : [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewareList));

sagaMiddleware.run(rootSaga);

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Enables react-native-screens for better optimization

  enableScreens();

  // font config

  let customFonts = {
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
    "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Italic": require("./assets/fonts/DMSans-Italic.ttf"),
  };

  const loadFonstAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonstAsync();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          source={SplashImage}
        />
      </View>
    );
  } else {
    return (
      // PaperProvider is our react-native-paper baseline styling
      <PaperProvider theme={myTheme}>
        {/* NavigationContainer and Stack.Navigator are our react navigation providers */}
        <NavigationContainer>
          {/* StoreProvider is what allows us to access Redux store throughout the app */}
          <StoreProvider store={store}>
            <StatusBar barStyle="dark-content" animated={true} />
            <TopStack />
          </StoreProvider>
        </NavigationContainer>
      </PaperProvider>
    );
  }
}

// Shared theme to be used throughout the application

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue: "#001a72",
    red: "#FF3F12",
    cream: "#ede0cf",
    green: "#3c5b46",
    grey: "#1c1939",
    lightGrey: "#e3e3e3",
  },
};
