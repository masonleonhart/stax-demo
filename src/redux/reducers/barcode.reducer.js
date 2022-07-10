import { combineReducers } from "redux";

// holds details for current scan returned from server

const scanDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_SCAN_DETAILS":
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
  scanDetails,
  scannedCompanyRanking,
  barcodeResult,
  betterMatches,
});
