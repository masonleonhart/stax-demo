import React from "react";

import { ActivityIndicator, View } from "react-native";

// A spiny circle to display in between scene change so there is no "flashing" of information

function EmptyStateView() {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}

export default EmptyStateView;
