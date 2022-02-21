import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

import { StyleSheet } from "react-native";
import {
  Portal,
  Dialog,
  Text,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";

import MyButton from "../reusedComponents/MyButton";

export default function NewProductModal({
  isDialogVisible,
  setIsDialogVisible,
  upcPostStatus,
  isReportOrAdd
}) {
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [didUpcPostReturn, setDidUpcPostReturn] = useState(false);

  // Check if the upcPost returned or not (true is successful return and false means error while null
  // means no return), if it returned, set didpostreturn to true, else, setpostreturn to false

  useEffect(() => {
    if (upcPostStatus === true || upcPostStatus === false) {
      setDidUpcPostReturn(true);
    } else {
      setDidUpcPostReturn(false);
    }
  }, [upcPostStatus]);

  // Function to run when user taps outside of dialor or clicks the ok button to dismiss
  // Checks if the upc post returned anything or not, if it didn't return so you cannot click
  // out of the standby, if it did, hide the dialog and check if there was a successful return or not
  // if there was a successful return, navigate back to home page, if there was an error, do nothing
  // and reset the upc post status to null

  const onDialogDismiss = () => {
    if (didUpcPostReturn) {
      setIsDialogVisible(false);

      if (upcPostStatus === true) {
        navigation.navigate("Landing");
      }

      setTimeout(() => dispatch({ type: "RESET_UPC_POST_STATUS" }), 250);
    } else {
      return;
    }
  };

  const styles = StyleSheet.create({
    dialog: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    dialogContent: {
      marginHorizontal:
        upcPostStatus === true ? "5%" : upcPostStatus === null ? "5%" : "0%",
      marginVertical: didUpcPostReturn ? "0%" : "5%",
    },
    dialogActions: {
      justifyContent: "center",
    },
    successText: {
      fontSize: 25,
      fontWeight: "600",
      textAlign: "center",
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
        visible={isDialogVisible}
        onDismiss={onDialogDismiss}
      >
        <Dialog.Content style={styles.dialogContent}>
          {upcPostStatus === true ? (
            <Text style={styles.successText}>
              {isReportOrAdd ? 'Product Reported successfully!' : 'Added new product successfully!'}
            </Text>
          ) : upcPostStatus === false ? (
              <Text style={styles.successText}>
                {isReportOrAdd ? 'Error in adding reporting product, please try again.' : 'Error in adding new product, please try again.'}
            </Text>
          ) : (
            <ActivityIndicator size={100} color={myTheme.colors.red} />
          )}
        </Dialog.Content>
        {didUpcPostReturn ? (
          <Dialog.Actions style={styles.dialogActions}>
            <MyButton
              text="Ok"
              style={styles.button}
              contentStyle={styles.buttonContent}
              onPress={onDialogDismiss}
            />
          </Dialog.Actions>
        ) : (
          <></>
        )}
      </Dialog>
    </Portal>
  );
}
