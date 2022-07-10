import { StyleSheet, Text, View, Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import fonts from "./fonts";
import { useSelector } from "react-redux";
import SharedStyles from "./SharedStyles";
import { useNavigation } from "@react-navigation/native";

const HeaderComponent = ({
  mainTitle,
  subTitle,
  backgroundColor,
  mainTitleStyle,
  subTitleStyle,
  backButton,
}) => {
  const usersName = useSelector((store) => store.user.personalName);
  const navigation = useNavigation();

  return (
    <View
      style={[
        SharedStyles.flexRow,
        styles.header,
        { backgroundColor: backgroundColor },
      ]}
    >
      {backButton && (
        <IconButton
          icon="chevron-left"
          size={30}
          style={styles.headerBackButtoon}
          color={"white"}
          onPress={() => navigation.goBack()}
        />
      )}
      <View style={styles.headerTextContainer}>
        <Text
          style={mainTitleStyle ? mainTitleStyle : styles.headerSettingsText}
        >
          {mainTitle}
        </Text>
        {subTitle && (
          <Text style={subTitleStyle ? subTitleStyle : styles.headerNameText}>
            {subTitle}
          </Text>
        )}
      </View>
      <View style={styles.userImage}>
        <Pressable onPress={() => navigation.navigate("Account")}>
          <Text style={styles.userInitials}>
            {usersName?.first_name[0]}
            {usersName?.last_name[0]}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  header: {
    height: SIZES.height * 0.25,
    paddingHorizontal: "5%",
    marginBottom: "2.5%",
  },
  headerBackButtoon: {
    position: "absolute",
    top: 0,
    marginTop: "7.5%",
    marginLeft: "5%",
    borderRadius: 100
  },
  headerTextContainer: {
    marginTop: "5%",
  },
  headerSettingsText: {
    color: COLORS.white,
    ...FONTS.h1,
    marginBottom: "5%",
  },
  headerNameText: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  userImage: {
    height: SIZES.height * 0.125,
    width: SIZES.height * 0.125,
    marginTop: "5%",
    borderRadius: 100,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  userInitials: {
    ...FONTS.largetitle,
    color: COLORS.darkgray,
  },
});
