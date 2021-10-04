import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/core";

import { ScrollView } from "react-native";

import SharedStyles from "../reusedComponents/SharedStyles";
import ValuesModal from "./ValuesModal";
import EmptyStateView from "../reusedComponents/EmptyStateView";

export default function Values() {
  const isFocused = useIsFocused();
  const [isDialogVisible, setIsDialogVisible] = useState(true);

  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <ScrollView style={SharedStyles.container}>
      <ValuesModal
        isDialogVisible={isDialogVisible}
        setIsDialogVisible={setIsDialogVisible}
      />
    </ScrollView>
  );
}
