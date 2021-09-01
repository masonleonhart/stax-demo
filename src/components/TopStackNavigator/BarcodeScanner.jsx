import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from "react-native";

import { IconButton, useTheme } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function BarcodeScanner({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height;
  const [hasPermission, setHasPermission] = useState(null);
  const companyDetails = useSelector((store) => store.barcodeDetails);

  // Gets camera permission

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Function to call on scan of barcode

  const handleBarCodeScanned = ({ type, data }) => {
    if (type.includes("UPC-E") || type.includes("EAN-13")) {
      dispatch({ type: "FETCH_BARCODE_DATA", payload: { type, data } });

      navigation.navigate("Company Profile");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    iconbutton: {
      position: "absolute",
      top: windowHeight * 0.025,
    },
  });

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  // Components to render on various permission states

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Renders barcodescanner component

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.container}
      >
        <IconButton
          icon="chevron-left"
          size={40}
          color={myTheme.colors.cream}
          onPress={() => navigation.goBack()}
          style={styles.iconbutton}
        />
      </BarCodeScanner>
    </View>
  );
}
