import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/core";
import axios from "axios";
import { SERVER_ADDRESS, AUTH_HEADER } from "@env";

import { ScrollView, StyleSheet } from "react-native";
import { Text, TextInput, useTheme, configureFonts } from "react-native-paper";

import SharedStyles from "../../reusedComponents/SharedStyles";
import MyButton from "../../reusedComponents/MyButton";
import NewProductModal from "../../modals/NewProductModal";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import fonts from "../../reusedComponents/fonts";

export default function ReportProductForm(props) {
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
    suggestion: "",
    description: "",
    manufacturer: "",
    title: "",
    price: "",
    store: "",
    flag: "reported",
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
    if (
      formDetails.manufacturer &&
      formDetails.title &&
      formDetails.suggestion &&
      formDetails.description
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formDetails, formStore]);

  // Function to run on submit press, shows dialog and dispatches data to to api

  const submitButtonPress = async () => {
    setIsDialogVisible(true);
    try {
      console.log({
        ...formDetails,
        ...formStore,
      });
      await axios
        .post(
          `${SERVER_ADDRESS}/api/v1/report_upc`,
          {
            ...formDetails,
            ...formStore,
          },
          { headers: { [AUTH_HEADER]: accessToken } }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      await setUpcPostStatus(true);
    } catch (error) {
      console.log("Error in reporting new upc");
      console.log(error);

      await setUpcPostStatus(false);
    }
  };

  // Shared theme for text inputs

  const inputTheme = {
    colors: {
      primary: myTheme.colors.blue,
      text: "black",
      placeholder: "black",
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
    headerText: {
      marginVertical: "5%",
      fontFamily: fonts.bold,
      fontSize: 24,
    },
    text: {
      fontSize: 18,
      fontFamily: fonts.regular,
    },
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    button: {
      marginTop: "10%",
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
        isReportOrAdd={true}
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        upcPostStatus={upcPostStatus}
      />

      <Text style={styles.headerText}>
        Report a Product
      </Text>

      <Text style={styles.text}>
        If you want to report this product details as wrong. Please fill out
        this quick form to help us store off this product information.
      </Text>

      <TextInput
        onChangeText={(text) => setFormDetails({ ...formDetails, store: text })}
        value={formDetails.store}
        autoCapitalize="words"
        label="What store are you in?"
        left={<TextInput.Icon name="cart" color={myTheme.colors.blue} />}
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
        left={<TextInput.Icon name="domain" color={myTheme.colors.blue} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) => setFormDetails({ ...formDetails, title: text })}
        value={formDetails.title}
        autoCapitalize="words"
        label="What is the product name?"
        left={<TextInput.Icon name="new-box" color={myTheme.colors.blue} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) => setFormStore({ price: text })}
        onFocus={onPriceFocus}
        onBlur={onPriceBlur}
        value={formStore.price}
        label="What is price of the product?"
        keyboardType="numeric"
        left={
          <TextInput.Icon name="currency-usd" color={myTheme.colors.blue} />
        }
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, suggestion: text })
        }
        value={formDetails.suggestion}
        autoCapitalize="words"
        label="What is your suggested change?"
        left={<TextInput.Icon name="domain" color={myTheme.colors.blue} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, description: text })
        }
        value={formDetails.description}
        autoCapitalize="words"
        label="Provide a description of the product"
        left={<TextInput.Icon name="domain" color={myTheme.colors.blue} />}
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
