import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useDispatch } from "react-redux";

import { Appbar, useTheme } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";

import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function BarcodeScanner({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Gets camera permission

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Function to call on scan of barcode

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    dispatch({ type: "FETCH_BARCODE_DATA", payload: data });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    appbar: {
      backgroundColor: "rgba(237, 224, 207, .5)",
      opacity: .01
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <Appbar.Header style={styles.appbar}>
          {/* <Appbar.Action
            icon="chevron-left"
            onPress={() => navigation.goBack()}
          /> */}
        </Appbar.Header>
      </BarCodeScanner>
    </View>
  );
}
