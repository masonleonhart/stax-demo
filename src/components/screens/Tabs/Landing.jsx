import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { Text, useTheme, IconButton } from "react-native-paper";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";

import MyButton from "../../reusedComponents/MyButton";

import fonts from "../../reusedComponents/fonts";
import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function Landing({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const deviceHeight = Dimensions.get("screen").height;
  const userValues = useSelector((store) => store.user.userInfo.values);
  const userInfo = useSelector((store) => store.user.userInfo);

  const topValuesButtonPress = () => {
    if (userValues.length === 0) {
      navigation.navigate("ValuesStack", {
        screen: "ValuesIntro",
      });
    } else {
      dispatch({ type: "SET_QUIZ_SELECTION", payload: userValues });

      navigation.navigate("ValuesStack", {
        screen: "ValuesComplete",
      });
    }
  };

  // surround with useMemo
  // https://reactjs.org/docs/hooks-reference.html#usememo

  const styles = StyleSheet.create({
    landingHeader: {
      backgroundColor: myTheme.colors.red,
      height: deviceHeight * 0.25,
      paddingHorizontal: "5%",
      marginBottom: "2.5%",
    },
    headerTextContainer: {
      marginTop: "5%",
    },
    headerWelcomeText: {
      color: "white",
      fontSize: 30,
      marginBottom: "5%",
      fontFamily: fonts.bold,
    },
    headerNameText: {
      color: "#e3e3e3",
      fontSize: 40,
      fontFamily: fonts.regular,
    },
    valuesWrapper: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      paddingBottom: "10%",
    },
    valuesHeaderText: {
      color: myTheme.colors.grey,
      fontSize: 20,
      fontFamily: fonts.medium,
    },
    value: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "5%",
      flex: 1,
      borderBottomColor: "#e3e3e3",
      borderBottomWidth: 1,
      paddingBottom: "5%",
    },
    valueText: {
      color: myTheme.colors.grey,
      fontSize: 20,
      fontFamily: fonts.regular,
      marginLeft: "5%",
    },
    valuesButton: {
      marginBottom: "0%",
    },
    getStartedButton: {
      marginTop: "10%",
    },
  });

  // move component outside of top component and pass theme down into the component as a prop

  const RenderValue = ({ icon, name }) => {
    return (
      <View style={styles.value}>
        <MaterialCommunityIcons
          name={icon}
          color={myTheme.colors.blue}
          size={30}
        />
        <Text style={styles.valueText}>{name}</Text>
      </View>
    );
  };

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView>
      <View style={[SharedStyles.flexRow, styles.landingHeader]}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerWelcomeText}>Welcome back</Text>
          <Text style={styles.headerNameText}>{userInfo.first_name}</Text>
        </View>
      </View>

      <View style={[SharedStyles.container]}>
        <View style={styles.valuesWrapper}>
          <View style={SharedStyles.flexRow}>
            <Text style={styles.valuesHeaderText}>My Top Values</Text>
            <IconButton
              icon="chevron-right"
              size={30}
              color={myTheme.colors.grey}
              onPress={topValuesButtonPress}
            />
          </View>

          {userValues.map((value) => (
            <RenderValue
              key={value.id}
              icon={value.icon_name}
              name={value.name}
            />
          ))}

          {userValues.length === 0 && (
            <MyButton
              style={styles.valuesButton}
              text="Take Our Values Quiz"
              onPress={() => navigation.navigate("ValuesStack")}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
