import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

import SharedStyles from "../reusedComponents/SharedStyles";
import MyButton from "../reusedComponents/MyButton";

export default function NoScanReturn() {
  const myTheme = useTheme();
  const recentScan = useSelector((store) => store.mostRecentBarcodeScanned);
  const [formDetails, setFormDetails] = useState({
    id: recentScan.data,
    upc: recentScan.data,
    user_id: 1,
    store: "",
    product_name: "",
    company: "",
    price: "",
    user_email: "",
  });

  // Shared theme for text inputs

  const inputTheme = {
    colors: {
      primary: myTheme.colors.green,
      text: myTheme.colors.grey,
      placeholder: myTheme.colors.grey,
    },
  };

  // Formatter for price on focus, convert to nice string

  const onPriceFocus = () => {
    setFormDetails({
      ...formDetails,
      price: formDetails.price.split(",").join(""),
    });
  };

  // Formatter for price on blur, convert to currency string

  const onPriceBlur = () => {
    if (formDetails.price) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      setFormDetails({
        ...formDetails,
        price: formatter.format(formDetails.price).slice(1),
      });
    } else {
      setFormDetails({ ...formDetails, price: "" });
    }
  };

  // Function to run on submit press, converts price to number and dispatches data to saga to send to api

  const submitButtonPress = () => {
    setFormDetails({ ...formDetails, price: Number(formDetails.price) });
  };

  const styles = StyleSheet.create({
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
  });

  return (
    <ScrollView
      style={SharedStyles.container}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        onChangeText={(text) => setFormDetails({ ...formDetails, store: text })}
        value={formDetails.store}
        label="What store are you in?"
        left={<TextInput.Icon name="cart" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, product_name: text })
        }
        value={formDetails.product_name}
        label="What is the product name?"
        left={<TextInput.Icon name="new-box" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, company: text })
        }
        value={formDetails.company}
        label="Who makes the product?"
        left={<TextInput.Icon name="domain" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) => setFormDetails({ ...formDetails, price: text })}
        onFocus={onPriceFocus}
        onBlur={onPriceBlur}
        value={formDetails.price}
        label="What is the product price?"
        keyboardType="numeric"
        left={
          <TextInput.Icon name="currency-usd" color={myTheme.colors.green} />
        }
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, user_email: text })
        }
        value={formDetails.user_email}
        label="What is your email?"
        left={<TextInput.Icon name="email" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <MyButton text="Submit" onPress={submitButtonPress} />
    </ScrollView>
  );
}
