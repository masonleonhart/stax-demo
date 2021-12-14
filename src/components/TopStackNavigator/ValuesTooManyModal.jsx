import React from "react";

import { StyleSheet } from "react-native";
import { Portal, Dialog, Text, useTheme } from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";

export default function ValuesTooManyModal({
  isTooManyDialogVisible,
  setIsTooManyDialogVisible,
}) {
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    dialog: {
      marginLeft: "10%",
      marginRight: "10%",
    },
    text: {
      fontSize: 18,
      lineHeight: 27,
      fontWeight: "600",
      textAlign: "center",
    },
    dialogActions: {
      justifyContent: "center",
    },
    button: {
      marginTop: "0%",
    },
    buttonContent: {
      width: 200,
    },
  });

  return (
    <Portal>
      <Dialog
        style={styles.dialog}
        visible={isTooManyDialogVisible}
        onDismiss={() => setIsTooManyDialogVisible(false)}
      >
        <Dialog.Content style={styles.dialogContent}>
          <Text style={styles.text}>
            You cannot select more than five values, please remove one from your
            list or finish your selection.
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <MyButton
            text="Ok"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => setIsTooManyDialogVisible(false)}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
