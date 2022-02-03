import React from "react";

import { StyleSheet } from "react-native";
import {
  Portal,
  Dialog,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";

export default function BarcodeScannerModal({
  isDialogVisible,
}) {
  const myTheme = useTheme();

  // Function that doesn't allow the dialog to be dismissed

  const onDialogDismiss = () => {
    return;
  };

  const styles = StyleSheet.create({
    dialog: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    dialogContent: {
      margin: "5%",
    },
  });

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={isDialogVisible}
        onDismiss={onDialogDismiss}
      >
        <Dialog.Content style={styles.dialogContent}>
          <ActivityIndicator size={100} color={myTheme.colors.red} />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
