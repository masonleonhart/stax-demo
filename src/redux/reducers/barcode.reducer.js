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

// most recent upc that was scanned

const mostRecentBarcodeScanned = (state = {}, action) => {
  switch (action.type) {
    case "SET_MOST_RECENT_SCAN":
      return action.payload;
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  barcodeDetails,
  mostRecentBarcodeScanned,
});
