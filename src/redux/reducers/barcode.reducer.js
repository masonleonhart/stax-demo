import { combineReducers } from "redux";

// holds details for current scan returned from server

const barcodeDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_BARCODE_DETAILS":
      return action.payload;
    case "RESET_BARCODE_DETAILS":
      return {};
    default:
      return state;
  }
};

// if there was an error in scan

const scanError = (state = null, action) => {
  switch (action.type) {
    case "SET_SCAN_ERROR_TRUE":
      return true;
    case "SET_SCAN_ERROR_FALSE":
      return false;
    default:
      return state;
  }
};

// most recent upc that was scanned

const mostRecentBarcodeScanned = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOST_RECENT_SCAN":
      return action.payload;
    default:
      return state;
  }
};

// if there was an error in the post of a new upc to db

const didUpcPostSuccessfully = (state = null, action) => {
  switch (action.type) {
    case "UPC_POST_SUCCESSFUL":
      return true;
    case "UPC_POST_ERROR":
      return false;
    case "RESET_UPC_POST_STATUS":
      return null;
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  barcodeDetails,
  scanError,
  mostRecentBarcodeScanned,
  didUpcPostSuccessfully,
});
