import { combineReducers } from "redux";
import barcode from "./barcode.reducer";
import user from "./user.reducer";
import filter from "./filter.reducer";

// Combines all of our redcuers into one root reducer that makes for easier access
// In the middleware

const valuesList = (state = [], action) => {
  switch (action.type) {
    case "SET_VALUES_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  valuesList,
  filter,
  barcode,
  user,
});
