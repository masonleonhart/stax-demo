import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

import SharedStyles from "../reusedComponents/SharedStyles";
import MyButton from "../reusedComponents/MyButton";
import NewProductModal from "./NewProductModal";

export default function NoScanReturn() {
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const recentScan = useSelector((store) => store.mostRecentBarcodeScanned);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const [formDetails, setFormDetails] = useState({
    id: recentScan.data,
    upc: recentScan.data,
    user_id: null,
    store: "",
    product_name: "",
    company_id: null,
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

  // Function to disable button or not based on if form fields are filled out with the price field foramtted

  useEffect(() => {
    if (
      formDetails.store &&
      formDetails.product_name &&
      formDetails.price &&
      formDetails.price.includes(".") &&
      formDetails.price.indexOf(".") + 3 === formDetails.price.length
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formDetails]);

  // Function to run on submit press, shows dialog and dispatches data to saga to send to api

  const submitButtonPress = () => {
    setIsDialogVisible(true);

    dispatch({ type: "POST_NEW_UPC", payload: formDetails });
  };

  const styles = StyleSheet.create({
    text: {
      marginVertical: "5%",
      fontSize: 18,
      lineHeight: 27,
      textAlign: "center"
    },
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    button: {
      marginTop: "15%"
    },
  });

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

      {/* <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, company_id: text })
        }
        value={formDetails.company_id}
        label="Who makes the product?"
        left={<TextInput.Icon name="domain" color={myTheme.colors.green} />}
        theme={inputTheme}
        style={styles.textInput}
      /> */}

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
      
      <MyButton
        text="Submit"
        onPress={submitButtonPress}
        disabled={isButtonDisabled}
        style={styles.button}
      />
    </ScrollView>
  );
}
