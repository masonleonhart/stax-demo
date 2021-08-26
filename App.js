import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";

import TopStack from './src/components/TopStack';

export default function App() {
  // Enables react-native-screens for better optimization

  enableScreens();

  return (
    // PaperProvider is our react-native-paper baseline styling
    <PaperProvider theme={myTheme}>
      {/* NavigationContainer and Stack.Navigator are our react navigation providers */}
      <NavigationContainer>
        {/* StoreProvider is what allows us to access Redux store throughout the app */}
        {/* <StoreProvider store={store}> */}
          <StatusBar barStyle="dark-content" animated={true} />
          <TopStack />
        {/* </StoreProvider> */}
      </NavigationContainer>
    </PaperProvider>
  );
}

// Shared theme to be used throughout the application

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    blue: "#8DD0EF",
    red: "#FF3F12",
    cream: "#ede0cf",
    green: "#3c5b46",
    grey: "#665e59",
    text: "#665e59"
  },
};

