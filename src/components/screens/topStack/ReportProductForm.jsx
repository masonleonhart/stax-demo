import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/core";
import axios from "axios";
import { SERVER_ADDRESS, AUTH_HEADER } from "@env";

import { StyleSheet } from "react-native";
import { Text, TextInput, useTheme, configureFonts } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import SharedStyles from "../../reusedComponents/SharedStyles";
import MyButton from "../../reusedComponents/MyButton";
import NewProductModal from "../../modals/NewProductModal";
import EmptyStateView from "../../reusedComponents/EmptyStateView";
import fonts from "../../reusedComponents/fonts";

export default function ReportProductForm({ route }) {
  const myTheme = useTheme();
  const isFocused = useIsFocused();
  const recentScan = useSelector(
    (store) => store.barcode.mostRecentBarcodeScanned
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [upcPostStatus, setUpcPostStatus] = useState(null);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const barcodeDetails = route.params.barcodeDetails;
  const companyRanking = route.params.companyRanking;

  const [formDetails, setFormDetails] = useState({
    barcode_formats: `${recentScan?.type?.split(".")[2]} ${recentScan?.data}`,
    barcode_number: recentScan?.data,
    suggestion: "",
    description: "",
    brand: "",
    manufacturer: "",
    title: "",
    store: "",
    flag: "reported",
  });

  const [formStore, setFormStore] = useState({
    price: "",
  });

  const [formOwner, setFormOwner] = useState({
    owner: "",
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

  useEffect(() => {
    setFormDetails({
      ...formDetails,
      brand: barcodeDetails.manufacturer,
      manufacturer: barcodeDetails.manufacturer,
      title: barcodeDetails.title,
    });

    "name" in companyRanking && setFormOwner({ owner: companyRanking.name });
  }, []);

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
      const response = await axios.post(
        `${SERVER_ADDRESS}/api/v1/report_incorrect_product`,
        {
          ...formDetails,
          ...formStore,
        },
        { headers: { [AUTH_HEADER]: accessToken } }
      );

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
      color: myTheme.colors.grey,
    },
    text: {
      fontSize: 18,
      fontFamily: fonts.regular,
      color: myTheme.colors.grey,
    },
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    requiredText: {
      marginVertical: "5%",
      fontFamily: fonts.regular,
      color: myTheme.colors.grey,
    },
    button: {
      marginTop: "0%",
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <KeyboardAwareScrollView
      style={SharedStyles.container}
      keyboardShouldPersistTaps="handled"
    >
      <NewProductModal
        isReportOrAdd={true}
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
        upcPostStatus={upcPostStatus}
      />

      <Text style={styles.headerText}>Report a Product</Text>

      <Text style={styles.text}>
        If you want to report these product details as wrong, pease fill out
        this quick form to help us imporve our product information.
      </Text>

      <TextInput
        onChangeText={(text) => setFormDetails({ ...formDetails, store: text })}
        value={formDetails.store}
        autoCapitalize="words"
        label="Are you at home or in a store (which store)?"
        left={<TextInput.Icon name="cart" color={myTheme.colors.blue} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, manufacturer: text, brand: text })
        }
        value={formDetails.manufacturer}
        autoCapitalize="words"
        label="Who makes the product?*"
        left={<TextInput.Icon name="domain" color={myTheme.colors.blue} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      {"name" in companyRanking && (
        <TextInput
          onChangeText={(text) =>
            setFormOwner({ owneer: text })
          }
          value={formOwner.owner}
          autoCapitalize="words"
          label="Who owns that company?"
          left={<TextInput.Icon name="domain" color={myTheme.colors.blue} />}
          theme={inputTheme}
          style={styles.textInput}
        />
      )}

      <TextInput
        onChangeText={(text) => setFormDetails({ ...formDetails, title: text })}
        value={formDetails.title}
        autoCapitalize="words"
        label="What is the product name?*"
        left={
          <TextInput.Icon
            name="package-variant-closed"
            color={myTheme.colors.blue}
          />
        }
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
          <TextInput.Icon name="currency-usd" color={myTheme.colors.blue} />
        }
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, description: text })
        }
        value={formDetails.description}
        label="Product description*"
        left={<TextInput.Icon name="lead-pencil" color={myTheme.colors.blue} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <TextInput
        onChangeText={(text) =>
          setFormDetails({ ...formDetails, suggestion: text })
        }
        value={formDetails.suggestion}
        autoCapitalize="words"
        label="What is your suggested change?*"
        left={<TextInput.Icon name="new-box" color={myTheme.colors.blue} />}
        theme={inputTheme}
        style={styles.textInput}
      />

      <Text style={styles.requiredText}>* Required</Text>

      <MyButton
        text="Submit"
        onPress={submitButtonPress}
        disabled={isButtonDisabled}
        style={styles.button}
      />
    </KeyboardAwareScrollView>
  );
}