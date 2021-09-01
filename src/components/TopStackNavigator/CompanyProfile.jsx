import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

import EmptyStateView from "../reusedComponents/EmptyStateView";
import NoScanReturn from "./NoScanReturn";

export default function CompanyProfile() {
  const isFocused = useIsFocused();
  const companyDetails = useSelector((store) => store.barcodeDetails);
  const scanError = useSelector((store) => store.scanError);

  console.log(companyDetails);
  // If the screen isn't in focus yet, render a placeholder screen

  if (!isFocused) {
    return <EmptyStateView />;
  }

  // If the barcode scan did not return anything, show an error page

  if (scanError) {
    return <NoScanReturn />;
  }

  return <></>;
}
