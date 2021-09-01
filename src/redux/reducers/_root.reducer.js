import { combineReducers } from "redux";

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

const scanError = (state = false, action) => {
  switch (action.type) {
    case "SET_SCAN_ERROR_TRUE":
      return true;
    case "SET_SCAN_ERROR_FALSE":
      return false;
    default:
      return state;
  }
};

// Combines all of our redcuers into one root reducer that makes for easier access
// In the middleware

const rootReducer = combineReducers({
  barcodeDetails,
  scanError,
});

export default rootReducer;
