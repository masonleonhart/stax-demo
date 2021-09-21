import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/core";

import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

import SharedStyles from "../reusedComponents/SharedStyles";
import MyButton from "../reusedComponents/MyButton";
import NewProductModal from "./NewProductModal";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function NoScanReturn() {
  const myTheme = useTheme();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const recentScan = useSelector(
    (store) => store.barcode.mostRecentBarcodeScanned
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [formDetails, setFormDetails] = useState({
    id: recentScan.data,
    // user_id: null,
    barcode_formats: `${recentScan.type.split(".")[2]} ${recentScan.data}`,
    barcode_number: recentScan.data,
    brand: "",
    manufacturer: "",
    title: "",
  });

  const [formStore, setFormStore] = useState({
    name: "",
    price: "",
  });

  // Formatter for price on focus, convert to nice string

  const onPriceFocus = () => {
    setFormStore({
      ...formStore,
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
        ...formStore,
        price: formatter.format(formStore.price).slice(1),
      });
    } else {
      setFormStore({ ...formStore, price: "" });
    }
  };

  // Function to disable button or not based on if form fields are filled out with the price field foramtted

  useEffect(() => {
    if (
      formStore.name &&
      formDetails.title &&
      formDetails.brand &&
      formStore.price &&
      formStore.price.includes(".") &&
      formStore.price.indexOf(".") + 3 === formStore.price.length
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formDetails, formStore]);

  // Function to run on submit press, shows dialog and dispatches data to saga to send to api

  const submitButtonPress = () => {
    setIsDialogVisible(true);

    dispatch({
      type: "POST_NEW_UPC",
      payload: { ...formDetails, stores: [formStore] },
    });
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
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
      />

      <Text style={styles.text}>
        Congratulations, you found a product that we have not yet indexed!
        Please fill out this quick form to help us store off this product
        information.
      </Text>

      <TextInput
        onChangeText={(text) => setFormStore({ ...formStore, name: text })}
        value={formStore.name}
        autoCapitalize="words"
        label="What store are you in?"
        left={<TextInput.Icon name="cart" color={myTheme.colors.green} />}
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
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, manufacturer: text, brand: text })
        }
        value={formDetails.brand}
        autoCapitalize="words"
        label="Who makes the product?"
        left={<TextInput.Icon name="domain" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) => setFormStore({ ...formStore, price: text })}
        onFocus={onPriceFocus}
        onBlur={onPriceBlur}
        value={formStore.price}
        label="What is the product price?"
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
