import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch } from "react-redux";
import { Dimensions } from "react-native";
import axios from "axios";
import config from "../../redux/sagas/server.config";

import { StyleSheet, Text, View } from "react-native";

import SharedStyles from "../reusedComponents/SharedStyles";
import EmptyStateView from "../reusedComponents/EmptyStateView";
import BarcodeScannerModal from "./BarcodeScannerModal";

export default function BarcodeScanner({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  // Gets camera permission

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Sets scanned and isDialogVisible to false when the screen comes into focus

  useEffect(() => {
    setScanned(false);

    setIsDialogVisible(false);
  }, [isFocused]);

  // Function to call on scan of barcode
  // Checks to make sure the barcode is of type UPC-A / UPC-E, if so, save the barcode data and type
  // in a reducer, send the type and data to the api and navigate to company profile if successful return,
  // or to new product form if error

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    setIsDialogVisible(true);

    if (type.includes("UPC-E") || type.includes("EAN-13")) {
      dispatch({ type: "SET_MOST_RECENT_SCAN", payload: { type, data } });

      try {
        const response = await axios.get(`${config.serverAddress}/api/v1/upc`, {
          params: { type, data },
          auth: config.creds,
        });

        await dispatch({
          type: "SET_BARCODE_DETAILS",
          payload: response.data.products[0],
        });

        await navigation.navigate("CompanyProfile");
      } catch (error) {
        console.log("Error in fetching barcode details");
        console.log(error);

        await dispatch({ type: "RESET_BARCODE_DETAILS" });

        await navigation.navigate("NewProductForm");
      }
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
        onBarCodeScanned={!scanned && handleBarCodeScanned}
        style={styles.barcodeScanner}
      >
        <BarcodeScannerModal
          isDialogVisible={isDialogVisible}
          setIsDialogVisible={setIsDialogVisible}
        />

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
