import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { View, ImageBackground } from "react-native";

import SplashImage from "../../../../assets/stax-splash.png";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

// Renders the login page

export default function Splash({ navigation }) {
  const isFocused = useIsFocused();

  setTimeout(() => {
    navigation.navigate("ValuesStack");
  }, 1000);

  // if the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        source={SplashImage}
      />
    </View>
  );
}
