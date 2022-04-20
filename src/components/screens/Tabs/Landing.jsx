import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import { Text, useTheme, IconButton } from "react-native-paper";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

import MyButton from "../../reusedComponents/MyButton";

import fonts from "../../reusedComponents/fonts";
import SharedStyles from "../../reusedComponents/SharedStyles";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import HeaderComponent from "../../reusedComponents/HeaderComponent";
import { COLORS } from "../../../constants/theme";

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
    headerWelcomeText: {
      color: "white",
      fontSize: 30,
      marginBottom: "5%",
      fontFamily: fonts.bold,
    },
    headerNameText: {
      color: "white",
      fontSize: 40,
      fontFamily: fonts.regular,
    },
    valuesWrapper: {
      borderBottomColor: myTheme.colors.grey,
      borderBottomWidth: 1,
      paddingBottom: "10%",
    },
    headerText: {
      color: myTheme.colors.grey,
      fontSize: 20,
      fontFamily: fonts.medium,
    },
    headerWorkInProgress: { color: myTheme.colors.gray, fontSize: 14 },
    value: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "5%",
      flex: 1,
      borderBottomColor: myTheme.colors.lightGrey,
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
    <>
      <HeaderComponent
        mainTitle="Welcome back"
        subTitle={userInfo?.first_name}
        mainTitleStyle={styles.headerWelcomeText}
        subTitleStyle={styles.headerNameText}
        backgroundColor={COLORS.red}
      />
      <ScrollView>
        <View style={[SharedStyles.container]}>
          <View style={styles.valuesWrapper}>
            <View style={SharedStyles.flexRow}>
              <Pressable onPress={topValuesButtonPress}>
                <Text style={styles.headerText}>My Top Values</Text>
              </Pressable>
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

          <View style={styles.valuesWrapper}>
            <View style={SharedStyles.flexRow}>
              <Pressable onPress={() => navigation.navigate("Discover")}>
                <Text style={styles.headerText}>Discover New Brands</Text>
              </Pressable>
              <IconButton
                icon="chevron-right"
                size={30}
                color={myTheme.colors.grey}
                onPress={() => navigation.navigate("Discover")}
              />
            </View>
          </View>

          <View style={styles.valuesWrapper}>
            <View style={SharedStyles.flexRow}>
              <Text style={styles.headerText}>
                News Feed <Text style={styles.headerWorkInProgress}>(WIP)</Text>
              </Text>
              <IconButton
                icon="chevron-right"
                size={30}
                color={myTheme.colors.grey}
                onPress={() => { }}
              />
            </View>
          </View>

          <View style={styles.valuesWrapper}>
            <View style={SharedStyles.flexRow}>
              <Text style={styles.headerText}>
                My Accounts <Text style={styles.headerWorkInProgress}>(WIP)</Text>
              </Text>
              <IconButton
                icon="chevron-right"
                size={30}
                color={myTheme.colors.grey}
                onPress={() => { }}
              />
            </View>
          </View>

          <View style={styles.valuesWrapper}>
            <View style={SharedStyles.flexRow}>
              <Text style={styles.headerText}>
                Latest Transactions{" "}
                <Text style={styles.headerWorkInProgress}>(WIP)</Text>
              </Text>
              <IconButton
                icon="chevron-right"
                size={30}
                color={myTheme.colors.grey}
                onPress={() => { }}
              />
            </View>
          </View>

          <View style={styles.valuesWrapper}>
            <View style={SharedStyles.flexRow}>
              <Text style={styles.headerText}>
                My Job Board{" "}
                <Text style={styles.headerWorkInProgress}>(WIP)</Text>
              </Text>
              <IconButton
                icon="chevron-right"
                size={30}
                color={myTheme.colors.grey}
                onPress={() => { }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
