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

const scannedCompanyRanking = (state = {}, action) => {
  switch (action.type) {
    case "SET_SCANNED_COMPANY_RANKING":
      return action.payload;
    default:
      return state;
  }
};

const barcodeResult = (state = {}, action) => {
  switch (action.type) {
    case "SET_SCANNED_COMPANY_BRAND":
      return action.payload
    default:
      return state;
  }
};

const betterMatches = (state = [], action) => {
  switch (action.type) {
    case "SET_MATCHING_COMPANY_LIST":
      return action.payload
    default:
      return state;
  }
}
// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  barcodeDetails,
  mostRecentBarcodeScanned,
  scannedCompanyRanking,
  barcodeResult,
  betterMatches,
});
