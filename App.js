import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { Provider as StoreProvider } from "react-redux";
import createSagaMiddlware from "redux-saga";
import logger from "redux-logger";
import { enableScreens } from "react-native-screens";

import TopStack from "./src/components/TopStack";

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
  // Enables react-native-screens for better optimization

  enableScreens();

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

// Shared theme to be used throughout the application

const myTheme = {
  ...DefaultTheme,
  fonts: configureFonts({
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  }),
  colors: {
    ...DefaultTheme.colors,
    blue: "#8DD0EF",
    red: "#FF3F12",
    cream: "#ede0cf",
    green: "#3c5b46",
    grey: "#665e59",
  },
};
