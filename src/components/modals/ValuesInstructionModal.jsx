import React from "react";

import { StyleSheet } from "react-native";
import { Portal, Dialog, Text, useTheme } from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";

export default function ValuesInstructionModal({
  isInstructionDialogVisible,
  setIsInstructionDialogVisible,
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
      <Dialog style={styles.dialog} visible={isInstructionDialogVisible}>
        <Dialog.Content style={styles.dialogContent}>
          <Text style={styles.text}>
            Select five values from the list below. The order in which you
            select does not matter.
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <MyButton
            text="Ok"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => setIsInstructionDialogVisible(false)}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
