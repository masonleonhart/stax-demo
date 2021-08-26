import { combineReducers } from "redux";

const barcodeDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_BARCODE_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

// Combines all of our redcuers into one root reducer that makes for easier access
// In the middleware

const rootReducer = combineReducers({
  barcodeDetails
});

export default rootReducer;