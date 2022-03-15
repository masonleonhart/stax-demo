import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import SERVER_ADDRESS from "../../../constants/server_address";
import { AUTH_HEADER } from "@env";

import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, useTheme, configureFonts } from "react-native-paper";

import ActivityModal from "../../modals/ActivityModal";
import MyButton from "../../reusedComponents/MyButton";
import SharedStyles from "../../reusedComponents/SharedStyles";
import fonts from "../../reusedComponents/fonts";
import EmptyStateView from "../../reusedComponents/EmptyStateView";

export default function ChangeName({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const myTheme = useTheme();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
  });
  const [canContinue, setCanContinue] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const userInfo = useSelector((store) => store.user.userInfo);

  const changeName = async () => {
    if (!canContinue) {
      Alert.alert("Error", "Missing field, please complete the form.");
    } else {
      try {
        setIsDialogVisible(true);

        const response = await axios.post(
          `${SERVER_ADDRESS}/api/v1/update_user_name`,
          {
            user_id: userInfo.id,
            first_name: form.first_name,
            last_name: form.last_name,
          },
          { headers: { [AUTH_HEADER]: userInfo.accessToken } }
        );

        await dispatch({
          type: "SET_USER_INFO",
          payload: {
            ...response.data.user,
            accessToken: userInfo.accessToken,
            providerId: userInfo.providerId,
          },
        });

        setIsDialogVisible(false);

        Alert.alert("Success", "Name updated successfully", [
          {
            text: "OK",
            onPress: () =>
              navigation.navigate("UpdateUserInfoLanding"),
          },
        ]);
      } catch (error) {
        setIsDialogVisible(false);
        console.log(error);
        // Alert.alert("Error", error);
      }
    }
  };

  useEffect(() => {
    setForm({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
    });
  }, []);

  useEffect(() => {
    // If any of the form fields are empty, disable the continue button

    if (!form.first_name || !form.last_name) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
    }
  }, [form]);

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
      marginVertical: "5%",
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
        <Text style={styles.headerText}>Update Name</Text>
        <Text style={styles.subheaderText}>Enter a new first or last name</Text>
      </View>

      <View>
        <TextInput
          value={form.first_name}
          onChangeText={(text) => setForm({ ...form, first_name: text })}
          underlineColor={myTheme.colors.grey}
          label="First Name"
          left={<TextInput.Icon name="account" color={myTheme.colors.blue} />}
          style={styles.textInput}
          theme={inputTheme}
        />

        <TextInput
          value={form.last_name}
          onChangeText={(text) => setForm({ ...form, last_name: text })}
          underlineColor={myTheme.colors.grey}
          label="Last Name"
          left={<TextInput.Icon name="account" color={myTheme.colors.blue} />}
          style={styles.textInput}
          theme={inputTheme}
        />
      </View>

      <MyButton text="Update Name" onPress={changeName} style={styles.button} />
    </View>
  );
}
