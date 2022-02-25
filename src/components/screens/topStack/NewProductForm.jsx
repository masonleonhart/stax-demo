import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/core";
import axios from "axios";
import { SERVER_ADDRESS, AUTH_HEADER } from "@env";

import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

import SharedStyles from "../../reusedComponents/SharedStyles";
import MyButton from "../../reusedComponents/MyButton";
import NewProductModal from "../../modals/NewProductModal";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import fonts from "../../reusedComponents/fonts";

export default function NoScanReturn(props) {
  const myTheme = useTheme();
  const isFocused = useIsFocused();
  const recentScan = useSelector(
    (store) => store.barcode.mostRecentBarcodeScanned
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [upcPostStatus, setUpcPostStatus] = useState(null);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);

  const [formDetails, setFormDetails] = useState({
    id: recentScan.data,
    barcode_formats: `${recentScan?.type?.split(".")[2]} ${recentScan?.data}`,
    barcode_number: recentScan?.data,
    manufacturer: "",
    title: "",
    price: "",
    store: "",
    flag: "Created",
  });

  const [formStore, setFormStore] = useState({
    price: "",
  });

  // Formatter for price on focus, convert to nice string

  const onPriceFocus = () => {
    setFormStore({
      price: formStore.price.split(",").join(""),
    });
  };

  // Formatter for price on blur, convert to currency string

  const onPriceBlur = () => {
    if (formStore.price) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      setFormStore({
        price: formatter.format(formStore.price).slice(1),
      });
    } else {
      setFormStore({ price: "" });
    }
  };

  // Function to disable button or not based on if form fields are filled out with the price field foramtted

  useEffect(() => {
    if (formDetails.title && formDetails.manufacturer) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formDetails, formStore]);

  // Function to run on submit press, shows dialog and dispatches data to to api

  const submitButtonPress = async () => {
    setIsDialogVisible(true);
    try {
      await axios
        .post(
          `${SERVER_ADDRESS}/api/v1/new_upc`,
          {
            ...formDetails,
            ...formStore,
          },
          { headers: { [AUTH_HEADER]: accessToken } }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      await setUpcPostStatus(true);
    } catch (error) {
      console.log("Error in posting new upc");
      console.log(error);

      await setUpcPostStatus(false);
    }
  };

  // Shared theme for text inputs
  const inputTheme = {
    colors: {
      primary: myTheme.colors.green,
      text: myTheme.colors.grey,
      placeholder: myTheme.colors.grey,
    },
  };

  const styles = StyleSheet.create({
    text: {
      marginVertical: "5%",
      fontSize: 18,
      lineHeight: 27,
      textAlign: "center",
      fontFamily: fonts.regular
    },
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    button: {
      marginTop: "15%",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView
      style={SharedStyles.container}
      keyboardShouldPersistTaps="handled"
    >
      <NewProductModal
        isReportOrAdd={false}
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        upcPostStatus={upcPostStatus}
      />

      <Text style={styles.text}>
        Congratulations, you found a product that we have not yet indexed!
        Please fill out this quick form to help us store off this product
        information.
      </Text>

      <TextInput
        onChangeText={(text) => setFormDetails({ ...formDetails, store: text })}
        value={formDetails.store}
        autoCapitalize="words"
        label="What store are you in?"
        left={<TextInput.Icon name="cart" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, manufacturer: text })
        }
        value={formDetails.manufacturer}
        autoCapitalize="words"
        label="Who makes the product?"
        left={<TextInput.Icon name="domain" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) => setFormDetails({ ...formDetails, title: text })}
        value={formDetails.title}
        autoCapitalize="words"
        label="What is the product name?"
        left={<TextInput.Icon name="new-box" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) => setFormStore({ price: text })}
        onFocus={onPriceFocus}
        onBlur={onPriceBlur}
        value={formStore.price}
        label="What is the price of the product?"
        keyboardType="numeric"
        left={
          <TextInput.Icon name="currency-usd" color={myTheme.colors.green} />
        }
        theme={inputTheme}
        style={styles.textInput}
      />

      <MyButton
        text="Submit"
        onPress={submitButtonPress}
        disabled={isButtonDisabled}
        style={styles.button}
      />
    </ScrollView>
  );
}
