import { combineReducers } from "redux";
import barcode from "./barcode.reducer";

// Combines all of our redcuers into one root reducer that makes for easier access
// In the middleware

export default combineReducers({
  barcode,
});
