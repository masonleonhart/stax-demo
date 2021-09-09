import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";

import { StyleSheet, Text, View } from "react-native";

import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function BarcodeScanner({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [hasPermission, setHasPermission] = useState(null);

  // Gets camera permission

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Function to call on scan of barcode
  // Checks to make sure the barcode is of type UPC-A / UPC-E, if so, save the barcode data and type
  // in a reducer, send the type and data to a saga to be sent to our api, and navigates to the
  // company profile page

  const handleBarCodeScanned = ({ type, data }) => {
    if (type.includes("UPC-E") || type.includes("EAN-13")) {
      dispatch({ type: "SET_MOST_RECENT_SCAN", payload: { type, data } });

      dispatch({ type: "FETCH_BARCODE_DATA", payload: { type, data } });

      navigation.navigate("CompanyProfile");
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    barcodeScanner: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    scanBorder: {
      height: windowHeight * 0.35,
      width: windowWidth * 0.9,
      justifyContent: "space-between",
    },
    borderCorner: {
      height: 100,
      width: 100,
      borderColor: "white",
    },
    topLeft: {
      borderTopWidth: 10,
      borderLeftWidth: 10,
      borderTopLeftRadius: 25,
    },
    topRight: {
      borderTopWidth: 10,
      borderRightWidth: 10,
      borderTopRightRadius: 25,
    },
    bottomLeft: {
      borderBottomWidth: 10,
      borderLeftWidth: 10,
      borderBottomLeftRadius: 25,
    },
    bottomRight: {
      borderBottomWidth: 10,
      borderRightWidth: 10,
      borderBottomRightRadius: 25,
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
        style={styles.barcodeScanner}
      >
        <View style={styles.scanBorder}>
          <View style={SharedStyles.flexRow}>
            <View style={[styles.borderCorner, styles.topLeft]} />
            <View style={[styles.borderCorner, styles.topRight]} />
          </View>
          <View style={SharedStyles.flexRow}>
            <View style={[styles.borderCorner, styles.bottomLeft]} />
            <View style={[styles.borderCorner, styles.bottomRight]} />
          </View>
        </View>
      </BarCodeScanner>
    </View>
  );
}
