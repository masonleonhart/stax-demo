import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { useTheme, IconButton } from "react-native-paper";

import ValuesIntro from "../screens/valuesStack/ValuesIntro";
import ValuesSelect from "../screens/valuesStack/ValuesSelect";
import ValuesBreak from "../screens/valuesStack/ValuesBreak";
import ValuesPairWiseMatching from "../screens/valuesStack/ValuesPairWiseMatching";
import ValuesComplete from "../screens/valuesStack/ValuesComplete";

export default function ValuesStack() {
  const Stack = createStackNavigator();
  const myTheme = useTheme();

  // Renders the values stack for the application

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerMode: "screen",
        gestureEnabled: true,
        headerTitle: "",
        cardStyle: {
          backgroundColor: "white",
        },
        headerLeft: () => (
          <IconButton
            icon="chevron-left"
            size={30}
            color={myTheme.colors.darkGrey}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen name="ValuesIntro" component={ValuesIntro} />
      <Stack.Screen name="ValuesSelect" component={ValuesSelect} />
      <Stack.Screen name="ValuesBreak" component={ValuesBreak} />
      <Stack.Screen
        name="ValuesPairWiseMatching"
        component={ValuesPairWiseMatching}
      />
      <Stack.Screen name="ValuesComplete" component={ValuesComplete} />
    </Stack.Navigator>
  );
}
