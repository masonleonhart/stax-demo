import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";

import SERVER_ADDRESS from "../../../constants/server_address";

import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, useTheme, configureFonts } from "react-native-paper";

import ActivityModal from "../../modals/ActivityModal";
import MyButton from "../../reusedComponents/MyButton";
import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function VerifyPassword({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const email = useSelector((store) => store.user.userInfo.email);
  const first_name = useSelector((store) => store.user.userInfo.first_name);
  const last_name = useSelector((store) => store.user.userInfo.last_name);
  const [password, setPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);


  const verifyPassword = async () => {
    if (!password) {
      Alert.alert("Error", "Please verify your current password");

      return;
    }

    setIsDialogVisible(true);

    // try {

    //   const response = await user.reauthenticateWithCredential(crediental);

    //   const authenticateData = {
    //     access_token: response.user.toJSON().stsTokenManager.accessToken,
    //     first_name,
    //     last_name,
    //     email,
    //   };

    //   const serverResponse = await axios.post(
    //     `${SERVER_ADDRESS}/api/v1/authenticate-user`,
    //     authenticateData
    //   );

    //   const userData = {
    //     ...serverResponse.data,
    //     accessToken: response.user.toJSON().stsTokenManager.accessToken,
    //     providerId: response.user.providerData[0].providerId,
    //   };

    //   await dispatch({ type: "SET_USER_INFO", payload: userData });

    //   setIsDialogVisible(false);
    //   navigation.navigate("UpdateUserInfoLanding");
    // } catch (error) {
    //   Alert.alert("Error", error.message);

    //   setIsDialogVisible(false);
    // }
  };

  // Shared theme for text inputs

  const inputTheme = {
    colors: {
      primary: myTheme.colors.blue,
      text: myTheme.colors.grey,
      placeholder: myTheme.colors.grey,
    },
    fonts: configureFonts({
      ios: {
        regular: {
          fontFamily: fonts.bold,
        },
      },
    }),
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: "space-between",
    },
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    subheaderText: {
      marginTop: "5%",
      fontFamily: fonts.regular,
      fontSize: 20,
    },
    textInput: {
      backgroundColor: "transparent",
    },
    button: {
      marginBottom: "50%",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <View style={[SharedStyles.container, styles.container]}>
      <ActivityModal isDialogVisible={isDialogVisible} />

      <View>
        <Text style={styles.headerText}>Update User Info</Text>
        <Text style={styles.subheaderText}>
          Please first verify your current password
        </Text>
      </View>
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={securePassword}
        underlineColor={myTheme.colors.grey}
        label="Verify Your Password"
        left={<TextInput.Icon name="lock" color={myTheme.colors.blue} />}
        right={
          <TextInput.Icon
            name="eye"
            color={myTheme.colors.blue}
            onPress={() => setSecurePassword(!securePassword)}
          />
        }
        style={styles.textInput}
        theme={inputTheme}
      />
      <MyButton
        text="Continue"
        onPress={verifyPassword}
        style={styles.button}
      />
    </View>
  );
}
